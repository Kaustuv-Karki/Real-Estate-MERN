import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(3030, () => {
  console.log("Server on port 3030");
});

app.use(express.json());
app.use("/api/user", userRouter);
