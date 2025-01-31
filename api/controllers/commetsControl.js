import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, name, profilePicture
     FROM comments AS c 
     JOIN users AS u 
     ON (u.id = c.userId) 
     WHERE c.postId = ? 
     ORDER BY c.createdAt DESC`;

  db.query(q, [req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRETKEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = `INSERT INTO comments ("description", "createdAt", "userI", "postId")
       VALUES (?)`;

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];

    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};

export const updateComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRETKEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = `UPDATE comments SET description = ?
     WHERE id = ? 
     AND userId = ?`;

    const values = [req.body.desc, req.params.id, userInfo.id];

    db.query(q, values, (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.affectedRows === 0)
        return res.status(404).json("Comment not found or not authorized!");

      return res.status(200).json("Comment has been updated.");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRETKEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM comments WHERE id = ? AND userId = ?";

    const values = [req.params.id, userInfo.id];

    db.query(q, values, (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.affectedRows === 0)
        return res.status(404).json("You can delete only your comments!");

      return res.status(200).json("Comment has been deleted.");
    });
  });
};
