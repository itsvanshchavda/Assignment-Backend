import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class LoginRequestDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'jone@gmail.com' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @ApiProperty({ example: 'Bytes@123' })
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,16}$/, {
        message:
            'Your password Password should be min 6 and max 16 with one number, one Uppercase, one lowercase and one Special character .',
    })
    password: string;
}
