import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProgressStackDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  user: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  stack: string;
}
