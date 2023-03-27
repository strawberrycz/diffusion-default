import { Router } from 'express';
import StabilityController from '@/controllers/stability.controller';
import { StabilityDto } from '@/dtos/stability.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class StabilityRoute implements Routes {
  public router = Router();
  public usersController = new StabilityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/last-img', this.usersController.getLastImg);
    this.router.post('/img', validationMiddleware(StabilityDto, 'body'), this.usersController.postImg);
  }
}

export default StabilityRoute;
