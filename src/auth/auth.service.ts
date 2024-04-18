import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginRequestDto } from './dto/LoginRequest.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupRequestDto } from './dto/SignupRequest.dto';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,

        @InjectModel(User.name)
        private readonly userTable: Model<User>,

    ) { }

    private async generateJWT(email: string): Promise<string> {
        try {
            const payload = { email };
            return this.jwtService.sign(payload);
        } catch (error) {
            throw error;
        }
    }

    async login(body: LoginRequestDto): Promise<any> {
        try {
            const user = await this.userTable.findOne({ email: body.email });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
            }

            const isPasswordMatch = await bcrypt.compare(body.password, user.password);
            if (!isPasswordMatch) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }

            const token = await this.generateJWT(user.email);

            return {
                status: HttpStatus.OK,
                message: 'User login successfully',
                accessToken: token,
                data: user,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async signup(body: SignupRequestDto): Promise<any> {
        try {
            // Check if user already exists
            const isExistUser = await this.userTable.findOne({ email: body.email });
            if (isExistUser) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }
    
            // Generate salt and hash password
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(body.password, salt);
    
            // Create new user
            const newUser = await this.userTable.create({
                fullName: body.fullName,
                email: body.email,
                password: hashedPassword,
            });
    
            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000);
    
            // Send OTP via email
            await this.sendEmail(body.email, otp);
    
            
            await this.userTable.updateOne({ email: body.email }, { otp });
    
           
            const updatedUser = await this.userTable.findOne({ email: body.email });
    
            
            if (!updatedUser) {
                throw new HttpException('User not found after creation', HttpStatus.INTERNAL_SERVER_ERROR);
            }
    
            
            const { password, ...userData } = updatedUser.toObject();
            return {
                status: HttpStatus.CREATED,
                message: 'User created successfully',
                user: userData,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    




    async sendEmail(email: string, otp: number): Promise<any> {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: "vansh778899v@gmail.com",
                    pass: "phmwahnfcgwhyume",
                },
            });
            const mailOptions = {
                from: "vansh778899v@gmail.com",
                to: email,
                subject: "OTP Verification",
                html: `<h1>Your OTP is ${otp}</h1>`,
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error)
            throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

