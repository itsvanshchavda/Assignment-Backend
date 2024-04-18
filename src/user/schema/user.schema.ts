import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Expose()
    @Transform((params) => params.obj._id)
    _id: string;

    @Prop({ type: String, required: true, index: true })
    @Expose()
    fullName: string;

    @Prop({ type: String, required: true, unique: true, index: true })
    @Expose()
    email: string;

    @Prop({ type: String, required: true })
    @Exclude()
    password: string;

    @Prop({ type: Number, required: false })
    @Exclude()
    phoneNumber: number;

    @Prop({ type: String, required: false, default: null })
    @Exclude()
    resetPasswordToken: string;

    @Prop({ type: Number, required: false, default: null })
    @Exclude()
    resetPasswordExpires: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
