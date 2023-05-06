import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { user as User } from '@prisma/client';
import {
  ChangePasswordDTO,
  RegisterDTO,
  UpdateInfoDTO,
  UserDTO,
} from './types/auth.dto';
import { plainToClass } from 'class-transformer';
import { LoginResponse, UserResponse } from './types/auth.interface';
import { AuthPayload } from 'src/types/AuthPayload';
import { Public } from './guards/public.metadata';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request & { user: User }): Promise<LoginResponse> {
    const { user_id, full_name, email } = req.user;
    return this.authService.generateJWT({ email, full_name, user_id });
  }

  @Public()
  @Post('register')
  @HttpCode(201)
  register(@Body() body: RegisterDTO): Promise<UserResponse> {
    return this.authService.generateUser(body);
  }

  @Put('profile')
  update(
    @Req() req: Request & { user: AuthPayload },
    @Body() body: UpdateInfoDTO,
  ): Promise<UserResponse> {
    return this.authService.updateProfileUser(req.user.user_id, body);
  }

  @Put('change-password')
  resetPassword(
    @Req() req: Request & { user: AuthPayload },
    @Body() body: ChangePasswordDTO,
  ) {
    return this.authService.changePassword(req.user.user_id, body);
  }
}
