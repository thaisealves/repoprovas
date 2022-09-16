import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { signInSchema, signUpSchema } from "../schemas/authSchema";
import {
  signInController,
  signUpController,
} from "../controllers/authController";
const route = Router();

route.post("/signup", validateSchema(signUpSchema), signUpController);
route.post("/signin", validateSchema(signInSchema), signInController);

export default route;
