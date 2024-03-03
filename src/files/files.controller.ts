import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './helpers/edit-file-name';
import { imageFileFilter } from './helpers/image-file-filter';
import { join } from 'path';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'public', 'avatar'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  ) // field of file
  public async upload(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.upload(file);
  }

  @Post('upload-manyFiles')
  @UseInterceptors(
    FileInterceptor('images', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'public', 'avatar'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  ) // field of file
  public async uploadFiles(@UploadedFile() files: Express.Multer.File) {
    return this.filesService.upload(files);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
