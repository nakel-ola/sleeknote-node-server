import { Router } from "express";
import {
  getProducts,
  getProductsById,
  getProductsBySlug,
} from "./products.contoller";

const router = Router();

router.get("/", getProducts);
router.get("bySlug/:slug", getProductsBySlug);
router.get("/byId/:id", getProductsById);
export default router;
