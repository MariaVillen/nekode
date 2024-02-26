import { Injectable } from '@nestjs/common';
import { File } from 'buffer';

@Injectable()
export class FilesService {
  update(file: File) {
    // Add file to user if doesnt exists in DB
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
