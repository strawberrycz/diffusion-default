import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { StabilityDto } from '@/dtos/stability.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/img`, validationMiddleware(StabilityDto, 'body'), this.usersController.getImg);
  }
}

export default UsersRoute;
