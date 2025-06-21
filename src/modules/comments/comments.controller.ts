import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikeCommentDto, ReactionType } from './dto/like-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('blogs/:blogId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Param('blogId') blogId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsService.create(blogId, createCommentDto);
    return new CommentResponseDto(comment);
  }

  @Get()
  async findAll(
    @Param('blogId') blogId: string,
  ): Promise<CommentResponseDto[]> {
    return this.commentsService.findAllByBlogId(blogId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commentsService.delete(id);
  }

  @Post(':id/like')
  async likeComment(
    @Param('id') commentId: string,
    @Body() likeDto: LikeCommentDto,
  ): Promise<CommentResponseDto> {
    likeDto.type = ReactionType.LIKE;
    const comment = await this.commentsService.reactToComment(
      commentId,
      likeDto,
    );
    return new CommentResponseDto(comment);
  }

  @Post(':id/dislike')
  async dislikeComment(
    @Param('id') commentId: string,
    @Body() dislikeDto: LikeCommentDto,
  ): Promise<CommentResponseDto> {
    dislikeDto.type = ReactionType.DISLIKE;
    const comment = await this.commentsService.reactToComment(
      commentId,
      dislikeDto,
    );
    return new CommentResponseDto(comment);
  }

  @Put(':id/love')
  async toggleCommentLove(
    @Param('id') commentId: string,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsService.toggleCommentLove(commentId);
    return new CommentResponseDto(comment);
  }
}
