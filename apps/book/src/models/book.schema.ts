import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({ versionKey: false })
export class BookDoc extends AbstractDocument {

    @Prop()
    timestamp: Date;

    @Prop()
    startDate: Date;

    @Prop()
    endDate:   Date;

    @Prop()
    unitId: string;

    @Prop()
    userId: string;

    @Prop()
    invoiceId: string;
}

export const BookSchema = SchemaFactory.createForClass(BookDoc);