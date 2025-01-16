import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entities';
import { User } from 'src/users/entities/user.entities';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document, User])],
  controllers: [DocumentsController],
  providers: [DocumentsService, UsersService],
})
export class DocumentsModule {}
