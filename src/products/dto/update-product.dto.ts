import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Nome do produto', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Descrição do produto', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Preço do produto', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'Quantidade em estoque', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;
}