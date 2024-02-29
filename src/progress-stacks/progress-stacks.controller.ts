import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProgressStacksService } from './progress-stacks.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateProgressStackDto } from './dto/create-progress-stack.dto';
import { Request } from 'express';

@ApiTags('Progress Stacks')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('progress-stacks')
export class ProgressStacksController {
  constructor(private readonly progressStacksService: ProgressStacksService) {}

  @Post('add') // Correct decorator with method name
  @ApiOperation({
    summary: 'Add Stack To User',
    description:
      "Add a stack to user so we can follow the user's progress in that stack.",
  })
  @ApiBody({ type: CreateProgressStackDto })
  async addStackToUser(
    @Req() req: Request,
    @Body() createProgressStack: CreateProgressStackDto,
  ) {
    const userAuth = req.userAuth;
    return this.progressStacksService.create(createProgressStack, userAuth);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: "Get User's stacks By Id",
    description: 'Get all the stacks that a user is evaluating',
  })
  public async findAllByUser(@Param('userId') userId: string) {
    return this.progressStacksService.findAllByUser(userId);
  }

  @Get(':stackId')
  @ApiOperation({
    summary: 'Get all progress of all users in stacks',
    description: 'Get all the stacks that a user is evaluating',
  })
  public async findOne(@Param('stackId') id: string) {
    return this.progressStacksService.findOne(id);
  }
}
