import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/LoginRequest.dto';
import { plainToClass } from 'class-transformer';
import { SignupRequestDto } from './dto/SignupRequest.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('signin')
    async login(@Body() body: LoginRequestDto): Promise<any> {
        return await this.authService.login(body);
    }

    @Post('signup')
    async signup(@Body() body: SignupRequestDto): Promise<any> {
        return await this.authService.signup(body);
    }
}
