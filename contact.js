import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  db.query(
    "INSERT INTO contacts (name,email,message) VALUES (?,?,?)",
    [name, email, message],
    () => res.json({ success: true })
  );
});

export default router;
