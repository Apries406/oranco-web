import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Websocket, Server} from 'ws'

import * as Y from 'yjs'
import * as awarenessProtocol from 'y-protocols/awareness'
import { Inject } from '@nestjs/common';
import { DocumentsService } from 'src/documents/documents.service';

const utils = require('y-websocket/bin/utils')
const {setupWSConnection} = utils

@WebSocketGateway({
  path: '/docroom',
  transport: 'ws'
})
export class CollabGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server

  private docs: Map<string, Y.Doc> = new Map();
  private awareness: Map<string, awarenessProtocol.Awareness> = new Map();

  @Inject()
  documentsService: DocumentsService
  async handleConnection(client: WebSocket, request: Request) {
    console.log('request', request.url)
    const url = new URL(request.url, 'http://localhost');
    const did = url.searchParams.get('did').split('/')[0] || 'default';
    const doc = await this.documentsService.findDocByDID(did)
    console.log(did, '+',doc.content)

    setupWSConnection(client, request, {...(did && { did })})
  }

  handleDisconnect(client: WebSocket) {
    console.log('Client disconnected');
  }

}