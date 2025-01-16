import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entities';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DocumentsService {

  @InjectRepository(Document)
  private readonly documentsRepository: Repository<Document>;
  
  @Inject()
  private readonly usersService: UsersService;

  async createDocument(userId: number){
    const newDoc = new Document()

    const owner = await this.usersService.findUserByID(userId)

    newDoc.author = owner

    this.documentsRepository.save(newDoc)
    
    return {
      code: 200,
      success: true,
      data: {
        documentId: newDoc.id,
      }
    }
  }
}
