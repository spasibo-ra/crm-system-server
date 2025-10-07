import { fileInterceptor } from '@common/interceptors/file-upload.interceptor';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('file/upload')
  @UseInterceptors(fileInterceptor('avatars'))
  async fileUpload(@UploadedFile() file: Express.Multer.File) {
    console.dir({ file });
    return file;
  }
}
