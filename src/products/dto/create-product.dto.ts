import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Descrição do produto', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Preço do produto' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Quantidade em estoque' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'URL da imagem do produto', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Tamanhos disponíveis', required: false })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({ description: 'Material do produto', required: false })
  @IsString()
  @IsOptional()
  material?: string;

  @ApiProperty({ description: 'Tipo do produto', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ description: 'Informações adicionais sobre o produto', required: false })
  @IsString()
  @IsOptional()
  about?: string;

  @ApiProperty({ description: 'Garantia do produto', required: false })
  @IsString()
  @IsOptional()
  warranty?: string;
}