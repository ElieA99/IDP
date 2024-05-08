import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../Model/users.model";
import { Request, Response, request } from "express";
dotenv.config();

//signup function
export const signup = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const { email, firstname, lastname, password, dob } = req.body;

    const hashedPwd = await bcrypt.hash(password, salt);

    //lets check if email is already registered
    const ifExist = await User.findOne({ email });
    if (ifExist) {
      return res.status(500).json({ error: "Email is already registered" });
    }

    const newUser = new User({
      email,
      firstname,
      lastname,
      password: hashedPwd,
      dob,
    });
    await newUser.save();
    return res.status(200).json({ message: "New User Created." });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

//signin function
export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const ifUserValid: any = await User.findOne({ email });
    if (!ifUserValid) {
      return res.status(404).json({ message: "ُInvalid credentials" });
    }
    //we need to check if the given password matches the one in the db
    const checkPwd = await bcrypt.compare(password, ifUserValid.password);
    if (!checkPwd) {
      return res.status(500).json({ message: "ُInvalid email or password !" });
    }

    //JWT
    var token = jwt.sign({ user: email }, "KEY");

    return res.status(200).json({ message: "Welcome Back", token });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

//edit profile
//update the pwd
export const edit = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);

    const ifExists = await User.findOne({ email });
    if (!ifExists) {
      return res.status(404).json({ error: "ُEmail not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    res.status(200).json({ message: "Password reset successful" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
