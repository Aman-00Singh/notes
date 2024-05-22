import mongoose from "mongoose";
import { date } from "zod";

const userschema = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String },
  password: { type: String },
  createdOn: {
    type: Date,
    default: new Date().getTime(),
  },
});

const User = mongoose.model("User", userschema);
export default User;
