import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { File } from 'multer';
import Stripe from 'stripe';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    @Inject('S3_SERVICE') private s3: S3Client,
    @Inject('STRIPE_SERVICE') private stripe: Stripe,
    private configService: ConfigService,
  ) {
    console.log('Stripe instance:', this.stripe);
  }

  async create(createProductDto: CreateProductDto, file?: File) {
    let imageUrl = createProductDto.imageUrl;
    if (file) {
      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `products/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await this.s3.send(command);
      imageUrl = `https://${params.Bucket}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${params.Key}`;
    }

    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
        imageUrl,
        size: createProductDto.size,
        material: createProductDto.material,
        type: createProductDto.type,
        about: createProductDto.about,
        warranty: createProductDto.warranty,
      },
    });

    await this.createStripeProduct(product);
    return product;
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, file?: File) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    let imageUrl = updateProductDto.imageUrl || product.imageUrl;
    if (file) {
      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `products/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await this.s3.send(command);
      imageUrl = `https://${params.Bucket}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${params.Key}`;
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name || product.name,
        description: updateProductDto.description || product.description,
        price: updateProductDto.price ?? product.price,
        stock: updateProductDto.stock ?? product.stock,
        imageUrl,
        size: updateProductDto.size || product.size,
        material: updateProductDto.material || product.material,
        type: updateProductDto.type || product.type,
        about: updateProductDto.about || product.about,
        warranty: updateProductDto.warranty || product.warranty,
      },
    });

    await this.createStripeProduct(updatedProduct);
    return updatedProduct;
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async syncWithStripe() {
    const products = await this.prisma.product.findMany();
    const stripeProducts = await Promise.all(products.map((product) => this.createStripeProduct(product)));
    return { message: 'Produtos sincronizados com o Stripe com sucesso', stripeProducts };
  }

  private async createStripeProduct(product: any) {
    try {
      console.log('Criando produto no Stripe:', product.name);
      const stripeProduct = await this.stripe.products.create({
        name: product.name,
        description: product.description || 'Sem descrição',
        images: product.imageUrl ? [product.imageUrl] : [],
      });

      const stripePrice = await this.stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: Math.round(product.price * 100),
        currency: 'brl',
      });

      await this.prisma.product.update({
        where: { id: product.id },
        data: {
          stripeProductId: stripeProduct.id,
          stripePriceId: stripePrice.id,
        },
      });

      return { stripeProduct, stripePrice };
    } catch (error) {
      console.error('Erro ao criar produto no Stripe:', error.message);
      throw error;
    }
  }
}