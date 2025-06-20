import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true , default: ['user'] })
    roles: string[];
    @Prop({ required: true , default: Date.now() })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);