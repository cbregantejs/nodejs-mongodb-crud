import express from "express";
const router = express.Router();
import { getProducts, getProductId, saveProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";

// get all products
router.get("/products", getProducts)

// get a product
router.get("/products/:id", getProductId);

// create product
router.post("/products", saveProduct)

// update a product
router.put('/products/:id', updateProduct)

// delete a product
router.delete('/products/:id', deleteProduct)


export default router;