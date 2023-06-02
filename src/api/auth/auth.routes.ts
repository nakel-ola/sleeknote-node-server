import { Router } from "express";
import zodvalidate from "../../middleware/zodvalidate.middleware";
import { login, logout, register } from "./auth.controller";
import { LoginSchema, RegisterSchema } from "./auth.model";

const router = Router();

router.post("/login", zodvalidate(LoginSchema), login);
router.post("/register", zodvalidate(RegisterSchema), register);
router.post("/logout", logout);

export default router;
