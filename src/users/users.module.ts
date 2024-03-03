import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), FilesModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, FilesService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
