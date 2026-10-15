import express from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username,email,password,role) VALUES (?,?,?,?)",
    [username, email, hashed, role],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "User registered" });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (result.length === 0)
        return res.status(400).json("User not found");

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json("Invalid password");

      res.json({
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
  );
});

export default router;
