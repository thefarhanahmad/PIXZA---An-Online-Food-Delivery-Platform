import mongoose from "mongoose";

// console.log("connection string : ", process.env.MONGODB_URI);

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected");
    return true;
  } catch (error) {
    console.log("db not connected");
    console.log(error);
  }
};

export default connectDB;
