const express = require("express");
const router = express.Router();
// Add getWishlistItems to your imports
const { registerUser, loginUser, toggleWishlist, getWishlistItems } = require("../Controllers/userController");
const { protect } = require("../Middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/wishlist", protect, toggleWishlist);

// NEW: Route to get full wishlist product details
router.get("/wishlist", protect, getWishlistItems);

module.exports = router;