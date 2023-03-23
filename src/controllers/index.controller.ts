import { NextFunction, Request, Response } from 'express';
import path from 'path';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render('./index.html', { status: 'good' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
