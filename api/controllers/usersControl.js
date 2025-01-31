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

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRETKEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `name` = ?, `city` = ?, `website` = ?, `coverPicture` = ?, `profilePicture` = ? WHERE id = ?";

    const values = [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.coverPic,
      req.body.profilePic,
      userInfo.id,
    ];
    db.query(q, values, (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your post!");
    });
  });
};

export const deleteUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRETKEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM users WHERE id = ?";

    const values = [userInfo.id];

    db.query(q, values, (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.affectedRows === 0)
        return res.status(404).json("User not found!");

      return res.status(200).json("User has been deleted.");
    });
  });
};
