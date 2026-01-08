import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();



app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://drivezone-one.vercel.app"
    ]
  })
);

app.use(express.json());

// Connect DB (non-blocking now)
connectDB();

app.get("/", (req, res) => {
  res.send("DriveZone Backend Running 🚗");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
