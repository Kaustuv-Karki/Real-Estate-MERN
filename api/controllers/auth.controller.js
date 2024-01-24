import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User Not Found"));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...others } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 10),
      })
      .status(200)
      .json({ message: "Login Successful", others });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { name, email, image } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...others } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 10),
        })
        .status(200)
        .json({ message: "Login Successful", others });
    } else {
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 12);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email,
        password: hashedPassword,
        avatar: image,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...others } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 10),
        })
        .status(200)
        .json({ message: "Login Successful", others });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Signout Successful" });
  } catch (error) {
    next(error.message);
  }
};
