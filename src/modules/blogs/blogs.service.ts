import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blogs } from './entities/blogs.entities';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blogs) private BlogRepository: Repository<Blogs>,
  ) {}

  private getPublicId(secureUrl: string): string {
    const parts = secureUrl.split('/');
    const lastPart = parts[parts.length - 1];
    const publicId = lastPart.split('.')[0];
    const folder = parts[parts.length - 2];
    return `${folder}/${publicId}`;
  }

  async findAll(): Promise<Blogs[]> {
    return await this.BlogRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Blogs | null> {
    return await this.BlogRepository.findOne({
      where: { id: id },
      relations: ['comments'],
    });
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blogs> {
    return await this.BlogRepository.save(createBlogDto);
  }

  async update(blog: Blogs, updateBlogDto: UpdateBlogDto): Promise<Blogs> {
    if (updateBlogDto.photo && blog.photo) {
      try {
        const oldPublicId = this.getPublicId(blog.photo);
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (error) {
        console.error('Gagal menghapus gambar lama di Cloudinary:', error);
      }
    }

    Object.assign(blog, updateBlogDto);
    return await this.BlogRepository.save(blog);
  }

  async delete(blog: Blogs): Promise<void> {
    if (blog.photo) {
      try {
        const publicId = this.getPublicId(blog.photo);
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error('Gagal menghapus gambar di Cloudinary:', error);
      }
    }

    await this.BlogRepository.delete(blog.id);
  }
}
