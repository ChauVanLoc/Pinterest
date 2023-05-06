import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentContentDTO, CommentDTO } from './types/comment.type';
import { AuthPayload } from 'src/types/AuthPayload';
import { cmt_emotion, comment, user } from '@prisma/client';
import { ResponseApi } from 'src/types/ApiResponse';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':image_id')
  findAllComment(@Param('image_id') param: number) {
    return this.commentService.findAll(param);
  }

  @Post()
  createComment(
    @Req() req: Request & { user: AuthPayload },
    @Body() body: CommentDTO,
  ) {
    return this.commentService.createComment({
      ...body,
      user_id: req.user.user_id,
    });
  }

  @Put()
  updateComment(@Body() { comment_id, content }: CommentContentDTO) {
    return this.commentService.updateComment(comment_id, content);
  }

  @Delete(':comment_id')
  deleteComment(
    @Req() req: Request & { user: AuthPayload },
    @Param('comment_id') param: number,
  ) {
    return this.commentService.deleteComment(req.user.user_id, param);
  }
}
