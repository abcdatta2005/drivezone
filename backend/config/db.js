import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    // ❌ DO NOT exit in production
  }
};
export default connectDB;

