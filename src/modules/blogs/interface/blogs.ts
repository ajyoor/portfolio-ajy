import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export interface BlogInterface {
  id: string;
  title: string;
  content: string;
  status: BlogStatus;
  tags?: string[];
}

export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export class FindOneParams {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
