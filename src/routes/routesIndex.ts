import { Router } from "express";
import authRoutes from "./authRoutes";
import { validateToken } from "../middlewares/validateToken";
import examRoutes from "./examRoutes";
const router = Router();

router.use(authRoutes);
router.use(validateToken);
router.use(examRoutes);

export default router;
