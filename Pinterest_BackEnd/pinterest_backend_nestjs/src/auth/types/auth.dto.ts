import { OmitType, PickType } from '@nestjs/mapped-types';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { NotMatch } from 'src/utils/NotMatch';

export class UserDTO {
  @Expose()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  user_id: number;

  @Expose()
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  full_name: string;

  @Expose()
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => {
    if (new Date(value) > new Date()) {
      return new Date().toISOString();
    }
    return value;
  })
  birth_day: Date;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email Incorrect!' })
  email: string;

  @Expose()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  password: string;
}

export class LoginDTO extends PickType(UserDTO, [
  'email',
  'password',
] as const) {}

export class RegisterDTO extends PickType(UserDTO, [
  'full_name',
  'email',
  'password',
]) {}

export class UpdateInfoDTO extends OmitType(UserDTO, [
  'user_id',
  'email',
  'password',
]) {}

export class ChangePasswordDTO {
  @Expose()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  new_password: string;

  @Expose()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  @NotMatch('new_password')
  old_password: string;
}
