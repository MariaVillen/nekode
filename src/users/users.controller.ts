import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProgressStackDto } from './dto/progress-stack.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLES } from 'src/config/constants/roles';

@ApiTags('Users')
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users
  @Get()
  @PublicAccess()
  findAll() {
    return this.usersService.findAll();
  }

  //Add a stack to the user
  @Post('stack')
  public async create(@Body() progressStackDto: ProgressStackDto) {
    return this.usersService.addStack(progressStackDto);
  }

  // Get a user by Id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  // get all the user's stack
  @Get(':userid/stack/all')
  public async findUserStacks(@Param('userid') userId: string) {
    return this.usersService.getAllUserStack(userId);
  }

  // get one stack of the user
  @Get(':userid/stack/:stackId')
  public async findOneUsertStack(
    @Param('userid') userId: string,
    @Param('stackId') stackId: string,
  ) {
    return this.usersService.getOneUserStack(userId, stackId);
  }

  // Update user
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // remove User
  @Roles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
