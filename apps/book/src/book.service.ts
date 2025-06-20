import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository:BookRepository){}
   create(createBookDto: CreateBookDto) {
     return this.bookRepository.create({
       ...createBookDto,
       timestamp: new Date(),
       userId: "1hu4",
       startDate: new Date(createBookDto.startDate),
       endDate: new Date(createBookDto.endDate)
     })
   }
  findAll() {
    return this.bookRepository.find({});
  }

  findOne(_id: string) {
    return this.bookRepository.findOne({ _id })
  }

  update(_id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.findOneAndUpdate({ _id }, { $set: updateBookDto });
  }

  remove(_id: string) {
    return this.bookRepository.findOneAndDelete({_id})
  }
}
