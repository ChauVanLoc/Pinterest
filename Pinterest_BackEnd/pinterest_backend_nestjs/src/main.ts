import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, UseGuards, ValidationPipe } from '@nestjs/common';
import { ErrorValidate } from './types/ErrorValidate';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory(errors) {
        const messages = errors.map((err) => {
          return {
            key: err.property,
            errors: err.constraints,
          } as ErrorValidate;
        });
        throw new BadRequestException(messages);
      },
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(1234);
}
bootstrap();
