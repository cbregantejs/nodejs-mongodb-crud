import express from "express";
const router = express.Router();
import { getProducts, getProductId, saveProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";

// get all products
// ?search=keyword -> search by keyword
router.get("/", getProducts)

// get a product
router.get("/:id", getProductId);

// create product
router.post("/", saveProduct)

// update a product
router.put('/:id', updateProduct)

// delete a product
router.delete('/:id', deleteProduct)


export default router;