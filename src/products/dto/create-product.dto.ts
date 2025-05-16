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
}