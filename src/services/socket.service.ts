import { Server } from 'socket.io';
import http from 'http';
import { logger } from '@/utils/logger';

class SocketService {
  private static _instance: SocketService;
  private static _io: Server;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static getInstance(): SocketService {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new SocketService();
    return this._instance;
  }

  static start(http: http.Server): SocketService {
    if (!this._io) {
      this._io = new Server(http);
      this.connect();
    }
    return this.getInstance();
  }

  static emit(event: string, message: string) {
    this._io.emit(event, message);
  }

  private static connect() {
    this._io.on('connection', socket => {
      logger.info(`SOCKET: ${socket.id} user connected`);
      socket.on('disconnect', () => {
        logger.info(`SOCKET: ${socket.id} user disconnected`);
      });
    });
  }
}

export default SocketService;
