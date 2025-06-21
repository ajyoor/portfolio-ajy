import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { extname } from 'path';

@Injectable()
export class UploadsService {
  getStorage(folder: string) {
    return new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        public_id: (req, file) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          return `<span class="math-inline">\{folder\}/</span>{uniqueSuffix}${extname(file.originalname)}`;
        },
      } as any,
    });
  }
}
