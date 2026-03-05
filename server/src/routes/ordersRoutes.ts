import express from "express";
import { getOrders } from "../controllers/ordersController";

const router = express.Router();

router.get("/", getOrders);

export default router;