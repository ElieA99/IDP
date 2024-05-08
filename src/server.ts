import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
const app = express();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

import userRoute from "./Routes/user.routes";

app.use("/user", userRoute);

if (!DB_URL) {
  process.exit;
}

mongoose
  .connect(DB_URL!, {
    family: 4, //To Prevent Connection Error
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT :${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
