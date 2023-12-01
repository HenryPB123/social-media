import bcrypt from "bcryptjs";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //SHECK user if exist
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length) return res.status(409).json("User already exist!");

    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("User has been created!");
    });
  });
};

//!---------------------------------------------------------------------
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE USERNAME = ?";

  db.query(q, [req.body.username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong username or Password!");

    const token = jwt.sign({ id: data[0].id }, process.env.SECRETKEY);

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

//!-----------------------------------------------------------
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out!");
};
