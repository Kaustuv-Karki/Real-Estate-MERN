import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
