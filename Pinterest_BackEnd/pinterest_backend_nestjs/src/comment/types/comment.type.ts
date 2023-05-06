import { PickType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CommentDTO {
  @IsString({ message: 'Content of comment is require' })
  @Length(1, 1000, { message: 'Lenght 1 - 1000 lenght' })
  content: string;

  @IsOptional()
  @IsNumber()
  parent_id: number;

  @IsNumber()
  image_id: number;
}

export class CommentContentDTO extends PickType(CommentDTO, ['content']) {
  @IsNumber()
  comment_id: number;
}
