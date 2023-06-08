import { Router } from "express";
import { getUser } from "./user.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getUser);

export default router;
