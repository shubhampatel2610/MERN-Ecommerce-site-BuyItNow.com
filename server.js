import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

// configure ENV file
dotenv.config();

// connect Database
connectDB();

// REST object
const app = express();

// middleware Mongon
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

// REST Api
app.get("/", (req, res) => {
  res.send("<h1>Hii..this is ecommerce app</h1>");
});

const PORT = 5000;
// Run App...Listen
app.listen(PORT, () => {
  console.log(` Server is running on localhost ${PORT} `.bgCyan.white);
});
