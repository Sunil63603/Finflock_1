import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getCart,
  setItemQty,
  removeItem,
  clearCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", getCart);
router.post("/items", setItemQty); // body: { productId, qty }
router.patch("/items/:productId", setItemQty); // body: { qty }
router.delete("/items/:productId", removeItem);
router.delete("/", clearCart);

export default router;
