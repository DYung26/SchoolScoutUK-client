import { db } from "@db";
import { Router } from "express";
import { AuthController } from "server/controllers/authController";
import { UserRepository } from "server/repositories/userRepository";
import { AuthService } from "server/services/authService";
import expressAsyncHandler from "express-async-handler";

const authRouter = Router();
const userRepo = new UserRepository(db);
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

authRouter.post('/signup', expressAsyncHandler(authController.signUp.bind(authController)));
authRouter.get('/login', expressAsyncHandler(authController.logIn.bind(authController)));

export default authRouter;
