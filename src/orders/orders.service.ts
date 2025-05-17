import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;

    if (!items.length) {
      throw new BadRequestException('O pedido deve conter pelo menos um item');
    }

    // Calcular o total do pedido
    let total = 0;
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) {
          throw new NotFoundException(`Produto com ID ${item.productId} não encontrado`);
        }
        if (product.stock < item.quantity) {
          throw new BadRequestException(`Estoque insuficiente para o produto ${product.name}`);
        }
        total += product.price * item.quantity;
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      }),
    );

    // Criar o pedido
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        orderItems: {
          create: orderItems,
        },
      },
      include: { orderItems: { include: { product: true } } },
    });

    // Atualizar o estoque
    await Promise.all(
      items.map((item) =>
        this.prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        }),
      ),
    );

    return order;
  }

  async findAllByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } } },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { orderItems: { include: { product: true } }, user: true },
    });
  }

  async findOne(id: number, userId: number, isAdmin: boolean) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: { include: { product: true } }, user: true },
    });
    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    if (!isAdmin && order.userId !== userId) {
      throw new BadRequestException('Acesso negado');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
      include: { orderItems: { include: { product: true } } },
    });
  }
}