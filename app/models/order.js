import mongoose from "mongoose";

// Define the schema for the Order model
const orderSchema = new mongoose.Schema(
  {
    myOrders: [],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
