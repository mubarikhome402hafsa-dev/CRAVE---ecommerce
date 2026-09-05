const express = require("express");
const router = express.Router();
// Add getAllOrders and updateOrderToDelivered to your imports
const { addOrderItems, getMyOrders, getAllOrders, updateOrderToDelivered } = require("../Controllers/orderController");
// Import the adminOnly middleware
const { protect, adminOnly } = require("../Middleware/authMiddleware");

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);

// NEW: Admin Protected Routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/deliver", protect, adminOnly, updateOrderToDelivered);

module.exports = router;