import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async create(userDto: UserDto): Promise<UsersEntity> {
    try {
      return await this.userRepository.save(userDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findAll(): Promise<UsersEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOne(id: string): Promise<UsersEntity> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        id,
        updateUserDto,
      );
      if (user.affected === 0) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async remove(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
