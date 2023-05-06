import { PickType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ImageEmotionDto {
  @IsNumber()
  image_id: number;

  @IsEnum(['like', 'love', 'wow', 'angry', 'sad', 'haha', 'heart'])
  status: 'like' | 'love' | 'wow' | 'angry' | 'sad' | 'haha' | 'heart';
}

export class CommentEmotionDto {
  @IsNumber()
  comment_id: number;

  @IsEnum(['like', 'love', 'wow', 'angry', 'sad', 'haha', 'heart'])
  status: 'like' | 'love' | 'wow' | 'angry' | 'sad' | 'haha' | 'heart';
}
