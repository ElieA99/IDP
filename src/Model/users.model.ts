import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    email: String,
    firstname: String,
    lastname: String,
    password: String,
    dob: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
