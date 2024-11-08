import express from "express";
import { removeFromCart,addToCart,getCart } from "../controllers/cartController.js";
import authMiddleWare from "../middleware/auth.js";
const cartRouter=express.Router();

cartRouter.post("/add",authMiddleWare, addToCart);
cartRouter.post("/remove",authMiddleWare, removeFromCart);
cartRouter.post("/get",authMiddleWare,getCart);


export default cartRouter;