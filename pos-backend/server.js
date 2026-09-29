import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import path from "path";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(cors());
app.use(express.json());

connectDB();

app.use("/pos/api/products", productRoutes);
app.use("/pos/api/sales", saleRoutes);
app.use("/pos/api/categories", categoryRoutes);
app.use("/pos/api/users", userRoutes);
app.use("/pos/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "POS Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});