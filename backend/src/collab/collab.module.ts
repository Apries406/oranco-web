import { Module } from '@nestjs/common';
import { DocumentsService } from 'src/documents/documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/documents/entities/document.entities';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entities';
import { CollabGateway } from './collab.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([Document, User])],
  providers: [DocumentsService, UsersService, CollabGateway],
})
export class CollabModule {}
