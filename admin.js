import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, data) =>
    res.json(data)
  );
});

router.get("/activities", (req, res) => {
  db.query("SELECT * FROM activities ORDER BY created_at DESC", (err, data) =>
    res.json(data)
  );
});

router.get("/services", (req, res) => {
  res.json([
    {
      name: "Living Room Interior",
      category: "Residential",
      design: "Modern",
      status: "Active",
    },
  ]);
});

export default router;
