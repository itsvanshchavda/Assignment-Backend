import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
    imports: [

        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI'),
                dbName: configService.get('MONGO_DB_NAME'),
                authSource: 'admin',
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
