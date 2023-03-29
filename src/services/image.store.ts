import { logger } from '@/utils/logger';
import { existsSync, readdirSync, renameSync } from 'fs';
import path from 'path';
import { generateAsync } from 'stability-client';
import SocketService from './socket.service';

class ImageStore {
  private FOLDER_NAME = '.examples';
  private FOLDER_PATH = path.join(process.cwd(), this.FOLDER_NAME);
  private counter = 0;
  private lastImage: string;
  private static _instance: ImageStore;

  private constructor() {
    this.initialSetup();
  }

  static getInstance(): ImageStore {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new ImageStore();
    return this._instance;
  }

  public async generateImage(prompt: string) {
    SocketService.emit('start', `New prompt:: ${prompt}`);
    const { images } = await generateAsync({
      prompt: prompt, //A dream of a distant galaxy, by Caspar David Friedrich, matte painting trending on artstation HQ
      apiKey: process.env.DREAMSTUDIO_API_KEY,
      width: 512,
      height: 512,
      samples: 1,
      cfgScale: 13,
      steps: 25,
      outDir: this.FOLDER_PATH,
      requestId: '1',
    });
    SocketService.emit('generated', prompt);
    logger.info(`IMAGE CREATED: ${prompt}`);

    const image = images[0];

    this.lastImage = this.renameImage(image.filePath, prompt);
    return this.lastImage;
  }

  public getLastImage(): string {
    try {
      if (existsSync(this.lastImage)) {
        return this.lastImage;
      }
    } catch (err) {
      logger.error(`IMAGE ${this.lastImage} can't be found.`);
      return undefined;
    }
  }

  private initialSetup() {
    let files: string[];
    try {
      files = readdirSync(this.FOLDER_PATH);
    } catch (e) {
      return;
    }
    this.counter = files.length + 1;
    files.forEach(file => {
      console.log(file);
    });
    this.lastImage = path.join(this.FOLDER_PATH, files[files.length - 1]);
  }

  private renameImage(oldPath: string, prompt: string): string {
    const extension = oldPath.split('.').pop();
    const newName = `${(this.counter++).toString().padStart(4, '0')}-${prompt.slice(0, 30)}.${extension}`;
    const newPath = path.join(this.FOLDER_PATH, newName);
    try {
      renameSync(oldPath, newPath);
    } catch (e) {
      return oldPath;
    }
    return newPath;
  }
}

export default ImageStore;
