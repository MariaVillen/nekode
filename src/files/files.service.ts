import { Injectable } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import * as fs from 'node:fs';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(private readonly serviceConfig: ConfigService) {}

  public async upload(file: Express.Multer.File) {
    const response = {
      originalName: file.originalname,
      fileName: file.filename,
    };
    return response;
  }

  public async uploadFiles(files: Express.Multer.File[]) {
    const response = [];
    files.forEach((file) => {
      const fileResponse = {
        originalName: file.originalname,
        fileName: file.filename,
      };
      response.push(fileResponse);
    });
    return response;
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(filename: string) {
    const filePath = `${join(__dirname, '..', '..', 'public', 'avatar')}/${filename}`;
    console.log('filePath ', filePath);
    try {
      console.log(fs.access);
      fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
          console.error(`No Read access at ${filePath}`);
        } else {
          fs.unlink(filePath, (error) => {
            console.log('error ', error);
          });
        }
      });
      return { message: 'file deleted' };
    } catch (error) {
      console.log('error ', error);
      return { message: 'file not found' };
    }
  }
}
