import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProgressThemesService } from './progress-themes.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProgressThemesDto } from './dto/create-progress-theme.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Request } from 'express';

@ApiTags('Progress Themes')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('progress-themes')
export class ProgressThemesController {
  constructor(private readonly progressThemesService: ProgressThemesService) {}

  @Post()
  @ApiOperation({
    summary: 'Add Theme To User',
    description:
      "Add a Theme to the user's progress stack so we can follow the user's progress in that theme. It is related to a progressStack.",
  })
  @ApiBody({ type: CreateProgressThemesDto })
  public async addUserToTheme(
    @Body() createProgressThemeDto: CreateProgressThemesDto,
    @Req() req: Request,
  ) {
    const { userAuth } = req;
    return this.progressThemesService.create(createProgressThemeDto, userAuth);
  }

  @Get('/stack/:id')
  @ApiOperation({
    summary: "Get all the themes of a user's progress",
    description:
      "Get all the theme's of the user's progress stack so we can follow the user's progress in that theme. It is related to a progressStack and the Id to pass is the progresStack Id.",
  })
  async findAll(@Param('id') id: string) {
    return this.progressThemesService.findAllByStackProgress(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get all the themes of a progress Stack by id',
    description:
      "Get all the theme's of the progress stack by Id, so we can follow the user's progress in that theme. It is related to a progressStack and the Id to pass is the progresStack Id.",
  })
  async findOne(@Param('id') id: string) {
    return this.progressThemesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modify the points of a user theme progress',
    description:
      'Modify the punctuation of a user (theme, stack and user) at the same time. You must pass the progressThemeId',
  })
  async update(@Param('id') id: string, @Body() data: { points: number }) {
    return this.progressThemesService.update(id, data.points);
  }
}
