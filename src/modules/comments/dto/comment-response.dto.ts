import { Expose, Transform } from 'class-transformer';
import { Comment } from '../entities/comment.entities';

export class CommentResponseDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.blog?.id)
  blogId: string;

  @Expose()
  name: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  likes: number;

  @Expose()
  dislikes: number;

  @Expose()
  isLoved: boolean;

  @Expose()
  replies: CommentResponseDto[];

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);

    if (partial.replies) {
      this.replies = partial.replies.map(
        (reply) => new CommentResponseDto(reply),
      );
    }
  }
}
