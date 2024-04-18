import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST"]
    });
    await app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            stopAtFirstError: true,
            exceptionFactory: (errors: ValidationError[]) => {
                const customError = errors.map((error) => {
                    return {
                        property: error.property,
                        error: Object.values(error.constraints)[0],
                    };
                });
                return new HttpException(
                    { statusCode: HttpStatus.BAD_REQUEST, errors: customError },
                    HttpStatus.BAD_REQUEST,
                );
            },
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('APIs list')
        .setVersion('1.0')
        .addBearerAuth()

        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
