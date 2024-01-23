import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;

  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userId], (error, data) => {
    if (error) return res.status(500).json(error);

    const { password, ...info } = data[0];

    return res.status(200).json(info);
  });
};
