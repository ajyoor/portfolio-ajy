import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FindOneParams } from './interface/blogs';
import { Blogs } from './entities/blogs.entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from 'src/modules/uploads/uploads.service';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly uploadsService: UploadsService,
  ) {}

  @Get()
  async findAll(): Promise<Blogs[]> {
    return await this.blogsService.findAll();
  }

  @Get('detail/:id')
  async findOne(@Param() params: FindOneParams): Promise<Blogs> {
    return await this.findOneOrFail(params.id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: new UploadsService().getStorage('portfolio_blogs'),
    }),
  )
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Blogs> {
    if (photo) {
      console.log('Cek Objek File dari Cloudinary:', photo);
      createBlogDto.photo = photo.path;
    }
    return await this.blogsService.create(createBlogDto);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: new UploadsService().getStorage('portfolio_blogs'),
    }),
  )
  async update(
    @Param() params: FindOneParams,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Blogs> {
    const blog = await this.findOneOrFail(params.id);

    if (photo) {
      updateBlogDto.photo = photo.path;
    }

    return await this.blogsService.update(blog, updateBlogDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: FindOneParams): Promise<void> {
    const blog = await this.findOneOrFail(params.id);
    await this.blogsService.delete(blog);
  }

  private async findOneOrFail(id: string): Promise<Blogs> {
    const blog = await this.blogsService.findOne(id);
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return blog;
  }
}
