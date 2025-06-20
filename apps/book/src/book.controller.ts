import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseDatePipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { createBookSchema, UpdateBookDto, updateBookSchema } from './dto/book.schema';
import { ZodValidationPipe, ParseObjectIdPipe } from '@app/common';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createBookSchema))
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateBookSchema))
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookService.remove(id);
  }
}
