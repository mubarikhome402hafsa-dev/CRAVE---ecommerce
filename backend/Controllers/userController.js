const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Middleware/authMiddleware");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      wishlist: user.wishlist, // Added wishlist here
      token: generateToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      wishlist: user.wishlist, // Added wishlist here
      token: generateToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updated Toggle Wishlist Function
exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare as strings to properly match Mongoose ObjectIds
    const alreadyWished = user.wishlist.some(
      (id) => id.toString() === productId.toString()
    );

    if (alreadyWished) {
      // Remove it
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId.toString()
      );
    } else {
      // Add it
      user.wishlist.push(productId);
    }

    await user.save();
    
    // Return updated array of string IDs for easy frontend matching
    res.json(user.wishlist.map((id) => id.toString()));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NEW: Get populated wishlist items
exports.getWishlistItems = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find the user and 'populate' the wishlist array with full Product documents
    const user = await User.findById(userId).populate("wishlist");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};