import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StacksService } from './stacks.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { ApiTags } from '@nestjs/swagger';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/config/constants/roles';

@ApiTags('Stacks')
@UseGuards(AuthGuard, RolesGuard)
@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {}

  @Roles(ROLES.ADMIN)
  @Post()
  create(@Body() createStackDto: CreateStackDto) {
    return this.stacksService.create(createStackDto);
  }

  @PublicAccess()
  @Get()
  findAll() {
    return this.stacksService.findAll();
  }
  @PublicAccess()
  @Get(':stackId')
  findOne(@Param('stackId') id: string) {
    return this.stacksService.findOne(+id);
  }

  @Roles(ROLES.ADMIN)
  @Patch(':stackId')
  update(@Param('stackId') id: string, @Body() updateStackDto: UpdateStackDto) {
    return this.stacksService.update(+id, updateStackDto);
  }

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stacksService.remove(+id);
  }
}
