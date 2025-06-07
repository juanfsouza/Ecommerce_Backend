import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ProductsService } from '../src/products/products.service';
import { CreateProductDto } from '../src/products/dto/create-product.dto';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productsService = app.get(ProductsService);

  const products: CreateProductDto[] = [
    {
      name: 'Tênis Fila Disruptor',
      description: 'Tênis esportivo Fila Disruptor com design moderno',
      price: 299.99,
      stock: 50,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/fila/tenis_fila_black_masculino_1.jpg',
      size: '38, 39, 40, 41, 42',
      material: 'Couro sintético e malha',
      type: 'Esportivo',
      about: 'Tênis ideal para treinos e uso casual, com sola antiderrapante e amortecimento avançado.',
      warranty: '1 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Fila Ray Tracer',
      description: 'Tênis Fila Ray Tracer com estilo retrô',
      price: 249.99,
      stock: 75,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/fila/tenis_fila_white_masculino_1.jpg',
      size: '38, 39, 40, 41, 42',
      material: 'Camurça e nylon',
      type: 'Casual',
      about: 'Tênis com design retrô, perfeito para compor looks urbanos e confortáveis.',
      warranty: '1 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Adidas Lite Race',
      description: 'Tênis Adidas Lite Race Black and White',
      price: 149.99,
      stock: 90,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/adidas/tenis_adidas_lite_race_black_masculino_1.jpg',
      size: '39, 40, 41, 42, 43',
      material: 'Algodão',
      type: 'Casual',
      about: 'Cabedal em lona + camurça traz leveza e estilo para o modelo.',
      warranty: '2 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Jordan Air',
      description: 'Tênis Jordan Air Black and Red Sporte',
      price: 749.99,
      stock: 50,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/jordan/tenis_jordan_air_black_red_masculino_1.jpg',
      size: '37, 38, 39, 40, 41, 42, 43',
      material: 'Algodão',
      type: 'Sporte',
      about: 'Sobreposições brilhantes e toques iridescentes distinguem o Air Jordan 1 Mid SE.',
      warranty: '2 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Jordan Air',
      description: 'Tênis Jordan Air Black and White Sporte',
      price: 729.99,
      stock: 90,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/jordan/tenis_jordan_air_black_white_masculino_1.jpg',
      size: '37, 38, 39, 40, 41, 42, 43',
      material: 'Algodão',
      type: 'Sporte',
      about: 'Sobreposições brilhantes e toques iridescentes distinguem o Air Jordan 1 Mid SE.',
      warranty: '2 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Jordan Air',
      description: 'Tênis Jordan Air Black and Blue Sporte',
      price: 739.99,
      stock: 40,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/jordan/tenis_jordan_mordern_black_blue_masculino_1.jpg',
      size: '37, 38, 39, 40, 41, 42, 43',
      material: 'Algodão',
      type: 'Sporte',
      about: 'Sobreposições brilhantes e toques iridescentes distinguem o Air Jordan 1 Mid SE.',
      warranty: '2 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Jordan Air',
      description: 'Tênis Jordan Air Black Sporte',
      price: 724.99,
      stock: 30,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/jordan/tenis_jordan_mordern_black_masculino_2.jpg',
      size: '37, 38, 39, 40, 41, 42, 43',
      material: 'Algodão',
      type: 'Sporte',
      about: 'Sobreposições brilhantes e toques iridescentes distinguem o Air Jordan 1 Mid SE.',
      warranty: '2 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Oldsen Jaguar',
      description: 'Tênis Oldsen Jaguar Black',
      price: 99.89,
      stock: 50,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/oldsen_jaguar/tenis_oldsen_jaguar_black_masculino_1.jpg',
      size: '39, 40, 41, 42, 43',
      material: 'Borracha & Textil',
      type: 'Casual',
      about: 'Tenis masculino macio confortavel Unissex, casual indicado para o dia a dia trabalho faculdade',
      warranty: '1 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Oldsen Jaguar',
      description: 'Tênis Oldsen Jaguar Blue',
      price: 89.89,
      stock: 50,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/oldsen_jaguar/tenis_oldsen_jaguar_blue_masculino_1.jpg',
      size: '39, 40, 41, 42, 43',
      material: 'Borracha & Textil',
      type: 'Casual',
      about: 'Tenis masculino macio confortavel Unissex, casual indicado para o dia a dia trabalho faculdade',
      warranty: '1 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Oldsen Jaguar',
      description: 'Tênis Oldsen Jaguar Green',
      price: 99.89,
      stock: 50,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/oldsen_jaguar/tenis_oldsen_jaguar_green_masculino_1.jpg',
      size: '39, 40, 41, 42, 43',
      material: 'Borracha & Textil',
      type: 'Casual',
      about: 'Tenis masculino macio confortavel Unissex, casual indicado para o dia a dia trabalho faculdade',
      warranty: '1 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Oldsen Jaguar',
      description: 'Tênis Oldsen Jaguar Green',
      price: 89.29,
      stock: 50,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/oldsen_jaguar/tenis_oldsen_jaguar_yellow_masculino_1.jpg',
      size: '39, 40, 41, 42, 43',
      material: 'Borracha & Textil',
      type: 'Casual',
      about: 'Tenis masculino macio confortavel Unissex, casual indicado para o dia a dia trabalho faculdade',
      warranty: '1 ano contra defeitos de fabricação',
    },
    {
      name: 'Tênis Yeezy Boost',
      description: 'Tênis Yeezy Boost Black',
      price: 559.29,
      stock: 30,
      imageUrl: 'https://mycommerce-bingcommerce.s3.us-east-2.amazonaws.com/products/Tenis/yeezy/tenis_yeezy_boost_black_masculino_1.jpg',
      size: '38, 39, 40, 41, 42, 43',
      material: 'Malha',
      type: 'Casual',
      about: 'Cabedal Primeknit, sola de acetato de vinil de etileno',
      warranty: '1 ano contra defeitos de fabricação',
    },
  ];

  for (const product of products) {
    await productsService.create(product);
  }

  console.log('Seed concluído com sucesso!');
  await app.close();
}

seed()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  });