import { Controller, Post, Body, Delete, Req, Param } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { CommentEmotionDto, ImageEmotionDto } from './types/emotion.type';
import { AuthPayload } from 'src/types/AuthPayload';

@Controller()
export class EmotionController {
  constructor(private readonly emotionService: EmotionService) {}

  // Create and Update emotion for comment
  @Post('cmt-emotion')
  createAndUpdateCmtEmotion(
    @Req() req: Request & { user: AuthPayload },
    @Body() body: CommentEmotionDto,
  ) {
    return this.emotionService.createAndUpdateCmtEmotion({
      ...body,
      user_id: req.user.user_id,
    });
  }

  @Delete('cmt-emotion/:id')
  deleteCmtEmotion(
    @Req() req: Request & { user: AuthPayload },
    @Param('id') comment_id: number,
  ) {
    return this.emotionService.deleteCmtEmotion(req.user.user_id, comment_id);
  }

  // Create emotion for image
  @Post('img-emotion')
  createAndUpdateImgEmotion(
    @Req() req: Request & { user: AuthPayload },
    @Body() body: ImageEmotionDto,
  ) {
    return this.emotionService.createAndUpdateImgEmotion({
      ...body,
      user_id: req.user.user_id,
    });
  }

  @Delete('img-emotion/:id')
  deleteImgEmotion(
    @Req() req: Request & { user: AuthPayload },
    @Param('id') image_id: number,
  ) {
    return this.emotionService.deleteImgEmotion(req.user.user_id, image_id);
  }
}
