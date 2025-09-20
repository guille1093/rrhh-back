import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class AlertsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly logger: Logger = new Logger('AlertsGateway');

  afterInit(server: Server): void {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  emitNewRequestAlert(request: Record<string, any>): void {
    if (this.server) {
      this.server.emit('newRequest', request);
    }
  }

  emitDashboardAlert(alert: Record<string, any>): void {
    if (this.server) {
      this.server.emit('dashboardAlert', alert);
    }
  }
}
