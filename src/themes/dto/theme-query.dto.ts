import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn, IsNotEmpty, ValidateIf } from 'class-validator';
import { IsNumericString } from 'src/utils/validator.decorator';

export class ThemeQueryDto {
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @ApiPropertyOptional()
  order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  orderBy?: string;

  @IsOptional()
  @IsNumericString()
  @ApiPropertyOptional()
  @ValidateIf((o) => o.page !== undefined)
  page?: number | string;

  @IsOptional()
  @IsNumericString()
  @ApiPropertyOptional()
  @ValidateIf((o) => o.limit !== undefined)
  limit?: number | string;
}
