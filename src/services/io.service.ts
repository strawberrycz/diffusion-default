import { Server } from 'socket.io';

class SocketIO {
  private static _instance: SocketIO;
  public io: Server;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): SocketIO {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new SocketIO();
    return this._instance;
  }

  private initializeSocketIO() {
    this.io.on('connection', socket => {
      console.log(`⚡: ${socket.id} user just connected`);
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
      socket.on('message', data => {
        //sends the data to everyone except you.
        // socket.broadcast.emit('response', data);

        //sends the data to everyone connected to the server
        socket.emit('response', data);
      });
    });
  }
}

export default SocketIO;
