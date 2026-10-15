import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import express from "express";
import cors from "cors";
import "./db.js";

import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import designRoutes from "./routes/design.js";
import adminRoutes from "./routes/admin.js";

const app = express();

/* ===============================
   MIDDLEWARE
================================ */

// Allow frontend requests
app.use(cors());

// Increase request size (for image uploads)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ===============================
   TEST ROUTE
================================ */

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

/* ===============================
   API ROUTES
================================ */

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/design", designRoutes);
app.use("/api/admin", adminRoutes);

/* ===============================
   STATIC FOLDER (Optional)
================================ */

app.use("/generated", express.static("generated"));

/* ===============================
   SERVER START
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});