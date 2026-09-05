const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [orderItemSchema],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      instructions: { type: String },
    },
    paymentMethod: { type: String, required: true, default: "Cash On Delivery" },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isDelivered: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);