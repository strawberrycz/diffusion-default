import { NextFunction, Request, Response } from 'express';
import { StabilityDto } from '@/dtos/stability.dto';
import { generateAsync } from 'stability-client';
import { logger } from '@utils/logger';
import SocketService from '@/services/socket.service';

class StabilityController {
  public getImg = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const prompt: StabilityDto = req.body;
      SocketService.emit('response', `Starting generating prompt::: ${prompt.text}`);
      const { response, images } = await generateAsync({
        prompt: prompt.text, //A dream of a distant galaxy, by Caspar David Friedrich, matte painting trending on artstation HQ
        apiKey: process.env.DREAMSTUDIO_API_KEY,
        width: 512,
        height: 512,
        samples: 1,
        cfgScale: 13,
        steps: 25,
        // sampler: 9,
      });
      SocketService.emit('response', prompt.text);
      logger.info(`PROMPT CREATED: ${prompt.text}`);

      // res.status(200).json({ data: images[0], message: 'generated' }); //{ images, res }
      res.sendFile(images[0].filePath);
    } catch (e) {
      next(e);
    }
  };
}

export default StabilityController;
