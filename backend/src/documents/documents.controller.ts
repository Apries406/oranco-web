import { Body, Controller, Header, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { LoginGuard } from 'src/guard/login.guard';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(LoginGuard)
  @Post('create')
  async createDocument(@Request() req) {
    const { id } = req.user
    return this.documentsService.createDocument(id);
  }
}
