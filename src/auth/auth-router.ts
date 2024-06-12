import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import AuthController from './auth-controller';
import AuthService from './auth-service';
import EventController from '../events/event-controller';

const authRouter = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/refresh-token', authController.refreshToken);


// Example protected route
authRouter.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have access to this route!' });
});

authRouter.get('/get-events', EventController.refreshToken);

export default authRouter;
