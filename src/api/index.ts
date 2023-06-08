import { Router } from "express";

import auth from "./auth/auth.routes";
import products from "./products/products.routes";
import user from "./user/user.routes";

const router = Router();

router.all("/", (req, res) => res.status(500).send("Nothing to see here"));

router.use("/auth", auth);
router.use("/user", user);
router.use("/products", products);

export default router;
