import { Router } from "express";
import authRouter from "./authRoutes";
import { validateToken } from "../middlewares/validateToken";
const router = Router();

router.use(authRouter);
router.use(validateToken);
export default router;
