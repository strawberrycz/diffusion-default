import { NextFunction, Request, Response } from 'express';
import { StabilityDto } from '@/dtos/stability.dto';
import ImageStore from '@/services/image.store';

class StabilityController {
  private imageStore = ImageStore.getInstance();

  public getLastImg = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const path = this.imageStore.getLastImage();
      if (path) {
        res.sendFile(path);
      } else {
        res.status(500).json({ message: 'No image generated yet.' });
      }
    } catch (e) {
      next(e);
    }
  };

  public postImg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const prompt: StabilityDto = req.body;
      const path = await this.imageStore.generateImage(prompt.text);
      res.sendFile(path);
    } catch (e) {
      next(e);
    }
  };
}

export default StabilityController;
