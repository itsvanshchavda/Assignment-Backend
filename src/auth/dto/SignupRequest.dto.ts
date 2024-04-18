import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class SignupRequestDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John Doe' })
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'admin@gmail.com' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @ApiProperty({ example: 'Test@123' })
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,16}$/, {
        message:
            'Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.',
    })
    password: string;
}
