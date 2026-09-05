const express = require("express");
const {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../Controllers/productController");
// Import security middleware
const { protect, adminOnly } = require("../Middleware/authMiddleware");

const prodRouter = express.Router();

// Public routes (Anyone can view products)
prodRouter.get("/products", getProducts);
prodRouter.get("/products/:id", getProductById);

// Admin Protected Routes (Only VIP tokens can modify products)
prodRouter.post("/products", protect, adminOnly, createProduct);
prodRouter.put("/products/:id", protect, adminOnly, updateProduct);
prodRouter.delete("/products/:id", protect, adminOnly, deleteProduct);

module.exports = prodRouter;

