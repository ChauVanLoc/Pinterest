import {
  Controller,
  Post,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Get } from '@nestjs/common';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes/file';
import { ImageDTO, ImageQueryDTO } from './types/image.dto';
import { AuthPayload } from 'src/types/AuthPayload';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
  constructor(private readonly imgService: ImageService) {}

  // Home: get all image
  @Get()
  async getAllImage(@Query() { image_name }: ImageQueryDTO) {
    return this.imgService.getAllImage(image_name);
  }

  // User: get all image is created
  @Get('created')
  async getAllImageCreated(@Req() req: Request & { user: AuthPayload }) {
    return this.imgService.getAllImageCreated(req.user.user_id);
  }

  // User: get all image is saved
  @Get('saved')
  async getAllImageSaved(@Req() req: Request & { user: AuthPayload }) {
    return this.imgService.getAllImageSaved(req.user.user_id);
  }

  // Get image deltail and isSaved by image_id
  // json response {...image, saved: saved????? ( true or false )}
  @Get(':image_id')
  async getImageById(
    @Req() req: Request & { user: AuthPayload },
    @Param('image_id') param: number,
  ) {
    return this.imgService.getImageDetailAndSaved(req.user.user_id, param);
  }

  // Delete image by image_id
  @Delete(':image_id')
  async deleteImageById(
    @Req() req: Request & { user: AuthPayload },
    @Param('image_id') param: number,
  ) {
    return this.imgService.deleteImageById(req.user.user_id, param);
  }

  // Unsave image by image_id
  @Delete('unsave/:image_id')
  async unsaveImageById(
    @Req() req: Request & { user: AuthPayload },
    @Param('image_id') param: number,
  ) {
    return this.imgService.unsaveImageById(req.user.user_id, param);
  }

  // create post by file image
  @UseInterceptors(FileInterceptor('image'))
  @Post('file')
  async createIdeaByFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 20000 * 1000 }), // maximum 20MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request & { user: AuthPayload },
    @Body() body: ImageDTO,
  ) {
    return this.imgService.createIdea({
      ...body,
      path: `localhost:1234/imgs/${file.filename}`,
      user_id: req.user.user_id,
    });
  }

  // Không check kiểu link base64
  // create post by url
  @Post('url')
  async createIdeaByUrl(
    @Req() req: Request & { user: AuthPayload },
    @Body() body: ImageDTO,
  ) {
    if (!body.path) {
      throw new BadRequestException('Url is required!');
    }
    if (!(await this.imgService.isImageAndExist(body.path))) {
      throw new BadRequestException('Invalid Url!');
    }
    return this.imgService.createIdea({
      ...body,
      user_id: req.user.user_id,
    });
  }
}
