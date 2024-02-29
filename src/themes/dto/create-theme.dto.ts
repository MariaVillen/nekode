import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { LEVELS } from '../../config/constants/levels';
import {
  IsNumber,
  IsPositive,
  IsString,
  //ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(LEVELS, {
    message: 'Solo hay actualmente niveles 1, 2 y 3',
  })
  @IsNotEmpty()
  @ApiProperty()
  level: LEVELS;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional()
  points: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsPositive({ message: 'El número de orden debe ser positivo' })
  order: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  stack: string;
}
