import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestPasswordResetDto {
  @ApiProperty({ description: 'E-mail do usuário' })
  @IsEmail()
  email: string;
}