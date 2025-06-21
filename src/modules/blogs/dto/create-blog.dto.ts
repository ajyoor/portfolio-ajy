import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { BlogStatus } from '../interface/blogs';
export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsEnum(BlogStatus)
  status: BlogStatus;

  @IsOptional()
  @IsString()
  photo: string;

  tags: string[];
}
