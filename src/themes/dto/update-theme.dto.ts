import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { LEVELS } from 'src/config/constants/levels';

export class UpdateThemeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsEnum(LEVELS, {
    message: 'Solo hay actualmente niveles 1, 2 y 3',
  })
  @IsNotEmpty()
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
}
