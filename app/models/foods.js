import mongoose from "mongoose";

// Define the schema for the FoodItem model
const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
    },
    price: {
      regular: String,
      medium: String,
      large: String,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FoodItem =
  mongoose.models.FoodItem || mongoose.model("FoodItem", foodItemSchema);

export default FoodItem;
