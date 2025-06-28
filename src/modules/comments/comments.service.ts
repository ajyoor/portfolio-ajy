import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entities';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ProfanityFilterService } from '../../shared/word-filter.service';
import { LikeCommentDto, ReactionType } from './dto/like-comment.dto';
import { Blogs } from '../blogs/entities/blogs.entities';
import { CommentResponseDto } from './dto/comment-response.dto';
import { TokenService } from '../../shared/token.service';

@Injectable()
export class CommentsService {
  private tokenReactions = new Map<string, Set<string>>();

  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Blogs)
    private blogRepository: Repository<Blogs>,
    private profanityFilter: ProfanityFilterService,
    private tokenService: TokenService,
  ) {}

  async create(
    blogId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const filteredContent = this.profanityFilter.filterText(
      createCommentDto.content,
    );

    const blog = await this.blogRepository.findOne({ where: { id: blogId } });
    if (!blog) throw new NotFoundException('Blog not found');

    const commentData: Partial<Comment> = {
      name: createCommentDto.name,
      content: filteredContent,
      blog: blog,
    };

    if (createCommentDto.parentId) {
      const parent = await this.commentRepository.findOne({
        where: { id: createCommentDto.parentId, blog: { id: blogId } },
        relations: ['blog'],
      });

      if (!parent) throw new NotFoundException('Parent comment not found');
      commentData.parent = parent;
    }

    const comment = this.commentRepository.create(commentData);
    return this.commentRepository.save(comment);
  }

  async findAllByBlogId(blogId: string): Promise<CommentResponseDto[]> {
    const comments = await this.commentRepository.find({
      where: {
        blog: { id: blogId },
        parent: null,
      },
      relations: ['blog', 'replies'],
      order: { createdAt: 'DESC' },
    });

    return comments.map((comment) => new CommentResponseDto(comment));
  }

  async delete(id: string): Promise<void> {
    const result = await this.commentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async reactToComment(
    commentId: string,
    reactionDto: LikeCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    if (!this.tokenService.isValidToken(reactionDto.clientToken)) {
      throw new BadRequestException('Invalid client token');
    }

    const tokenKey = reactionDto.clientToken;

    if (this.tokenReactions.has(tokenKey)) {
      const reactions = this.tokenReactions.get(tokenKey);
      if (reactions.has(commentId)) {
        throw new BadRequestException(
          'You have already reacted to this comment',
        );
      }
    } else {
      this.tokenReactions.set(tokenKey, new Set());
    }

    if (reactionDto.type === ReactionType.LIKE) {
      comment.likes += 1;
    } else {
      comment.dislikes += 1;
    }

    this.tokenReactions.get(tokenKey).add(commentId);

    return this.commentRepository.save(comment);
  }

  async toggleCommentLove(commentId: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    comment.isLoved = !comment.isLoved;
    return this.commentRepository.save(comment);
  }
}
