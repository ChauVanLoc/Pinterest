import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class ImageDTO {
  @Exclude()
  image_id: number;

  @Length(1, 500, { message: 'Min lenght 1 - Max lenght 500' })
  name: string;

  @IsOptional()
  @MaxLength(2800, { message: 'url max lenght 2800' })
  path: string;

  @IsOptional()
  @MaxLength(500, { message: 'Max lenght 500' })
  description: string;

  @Exclude()
  created: Date;
}

export class ImageQueryDTO {
  @IsOptional()
  image_name: string;
}
