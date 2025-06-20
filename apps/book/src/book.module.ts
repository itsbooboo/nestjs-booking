import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from '@app/common';
import { BookRepository } from './book.repository';
import { BookDoc, BookSchema } from './models/book.schema';
import { log } from 'console';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [DatabaseModule,DatabaseModule.forFeature([{name:BookDoc.name, schema:BookSchema}]),LoggerModule.forRoot({
    pinoHttp:{
      transport:{
        target:'pino-pretty',
        options:{
          singleLine:true
        }
      }
    }
  })],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
