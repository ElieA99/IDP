import express from "express";
import { signIn, signup, edit } from "../Controller/user.controller";

const userRoute = express.Router();

userRoute.post("/signUp", signup);
userRoute.post("/signIn", signIn);
userRoute.put("/edit", edit);

export default userRoute;
