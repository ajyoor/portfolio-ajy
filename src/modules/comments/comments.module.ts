import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entities';
import { Blogs } from '../blogs/entities/blogs.entities';
import { ProfanityFilterService } from '../../shared/word-filter.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Blogs]), SharedModule],
  controllers: [CommentsController],
  providers: [CommentsService, ProfanityFilterService],
})
export class CommentsModule {}
