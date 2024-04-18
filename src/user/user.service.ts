import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/constant/message';
import { SignupRequestDto } from 'src/auth/dto/SignupRequest.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userTable: Model<User>,
    ) {

    }
    async generatePasswordHash(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt();
            return await bcrypt.hash(password, salt);
        } catch (error) {
            throw error;
        }
    }

    async create(body: SignupRequestDto): Promise<any> {
        try {
            const isUserExist = await this.userTable.findOne({ email: body.email });
            if (isUserExist) {
                throw new HttpException(Message.USER_EXIST, HttpStatus.BAD_REQUEST);
            }
            return await this.userTable.create({
                fullName: body.fullName,
                email: body.email.toLowerCase(),
                password: await this.generatePasswordHash(body.password),
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
