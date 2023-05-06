import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, UseGuards, ValidationPipe } from '@nestjs/common';
import { ErrorValidate } from './types/ErrorValidate';
import { AuthGuard } from '@nestjs/passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
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
