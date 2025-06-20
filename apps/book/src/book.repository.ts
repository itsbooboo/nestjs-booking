import { Injectable, Logger } from "@nestjs/common";
import { BookDoc } from "./models/book.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "@app/common";

@Injectable()
export class BookRepository extends AbstractRepository<BookDoc> {
protected readonly logger = new Logger(BookRepository.name);
constructor(@InjectModel(BookDoc.name) bookModel: Model<BookDoc>) {
    super(bookModel);
}

}