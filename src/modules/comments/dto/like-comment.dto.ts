import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum ReactionType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

export class LikeCommentDto {
  @IsNotEmpty()
  @IsString()
  clientToken: string;

  @IsNotEmpty()
  @IsEnum(ReactionType)
  type: ReactionType;
}
