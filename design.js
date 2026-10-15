import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/generate", (req, res) => {
  const { user, roomType, designType, notes } = req.body;

  const description = `A ${designType} ${roomType} interior with modern elegance`;

  // save design
  db.query(
    "INSERT INTO designs (user_email,room_type,design_type,notes,ai_result) VALUES (?,?,?,?,?)",
    [user, roomType, designType, notes, description]
  );

  // save activity
  db.query(
    "INSERT INTO activities (user_name,activity,service) VALUES (?,?,?)",
    [user, "Generated Interior Design", `${designType} ${roomType}`]
  );

  res.json({ description });
});

export default router;
