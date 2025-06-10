import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { extname } from 'path';

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      return `uploads/${uniqueSuffix}${extname(file.originalname)}`;
    },
  } as any,
});

@Controller('uploads')
export class UploadsController {
  @Post('image')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: cloudinaryStorage,
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(
            new Error(
              'Hanya file gambar (jpg, jpeg, png, gif) yang diizinkan!',
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { success: false, message: 'Tidak ada file yang diupload.' };
    }

    return { success: true, imageUrl: file.path };
  }
}
