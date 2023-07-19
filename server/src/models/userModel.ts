import { NextFunction } from "express";
import mongoose, { Model } from "mongoose";
import CryptoJS from "crypto-js";
interface userSchemaType {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  verify: boolean;
  refeshToken: string;
  role: string;
}
//TODO: declare mongoose method & model
interface userMethod {
  isPasswordMatched(enterPassword: string): boolean;
}
type userModel = Model<userSchemaType, {}, userMethod>;
const userSchema = new mongoose.Schema<userSchemaType, userModel, userMethod>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    refeshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = CryptoJS.AES.encrypt(
    `${this.password}`,
    `${process.env.CRYPTO_KEY}`
  ).toString();
});
//TODO:mongoose method
userSchema.method(
  "isPasswordMatched",
  function isPasswordMatched(enterPassword: string) {
    const hashedPassword = CryptoJS.AES.decrypt(
      `${this.password}`,
      `${process.env.CRYPTO_KEY}`
    ).toString(CryptoJS.enc.Utf8);

    if (hashedPassword === enterPassword.toString()) {
      return true;
    }
    return false;
  }
);
export default mongoose.model("User", userSchema);