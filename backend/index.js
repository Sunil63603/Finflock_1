// src/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDB } from "./src/db/mongo.js";
import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/products.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// health
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.BACKEND_PORT || 4000;

connectToDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`API listening on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
    process.exit(1);
  });
