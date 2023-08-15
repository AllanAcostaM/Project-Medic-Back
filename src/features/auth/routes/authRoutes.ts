import express, { Router } from 'express';
import { SignIn } from '@auth/controllers/signin';
import { SignOut } from '@auth/controllers/signout';
import { SignUp } from '@auth/controllers/singup';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Desing Pattern: Mediator: https://refactoring.guru/es/desing-patterns/mediator
    // Desing Pattern: Prototype: https://refactoring.guru/es/desing-patterns/prototype
    this.router.post('/signup', SignUp.prototype.create);
    this.router.post('/signin', SignIn.prototype.read);

    return this.router;
  }
  public signoutRoute(): Router {
    this.router.get('/signout', SignOut.prototype.update);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
