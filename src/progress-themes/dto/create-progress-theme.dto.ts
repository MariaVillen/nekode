import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProgressThemesDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  theme: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  progressStack: string;
}
