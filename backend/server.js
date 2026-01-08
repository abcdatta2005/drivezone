require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

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
