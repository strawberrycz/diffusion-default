import { Server } from 'socket.io';
import http from 'http';

class SocketService {
  private static _instance: SocketService;
  private static _io: Server;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public constructor() {}

  static getInstance(): SocketService {
    if (this._instance) {
      return this._instance;
    }

    // throw Error('SocketService was not started');
  }

  static start(http: http.Server): SocketService {
    this._io = new Server(http);
    this.connect();
    return this.getInstance();
  }

  static emit(event: string, message: string) {
    this._io.emit(event, message);
  }

  private static connect() {
    this._io.on('connection', socket => {
      console.log(`⚡: ${socket.id} user just connected`);
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
      socket.on('message', data => {
        //sends the data to everyone except you.
        // socket.broadcast.emit('response', data);

        //sends the data to everyone connected to the server
        console.log('message', data);
        socket.emit('response', data);
      });
    });
  }
}

export default SocketService;