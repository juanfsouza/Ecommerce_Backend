import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Token de redefinição' })
  @IsString()
  token: string;

  @ApiProperty({ description: 'Nova senha' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}