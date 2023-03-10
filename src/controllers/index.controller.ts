import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const file = 'G:\\My Drive\\txt2img-images\\00000-4236201793-Napric at a party, professional photography, 50mm, digital art.png'; //path.join(__dirname, '/index.html');
      console.log('PATH: ', file);
      res.sendFile(file);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
