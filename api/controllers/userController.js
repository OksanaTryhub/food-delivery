import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
import ctrlWrapper from "./../utils/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

dotenv.config();
const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

const test = async (req, res) => {
  res.send("Hello User test");
};

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw HttpError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  const { password: pass, token: tok, ...rest } = newUser._doc;
  res.status(201).json({ success: true, token, user: rest });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email });

  if (!validUser) {
    throw HttpError(401, "Email or password invalid");
  }

  const isPasswordMatch = await bcrypt.compare(password, validUser.password);
  if (!isPasswordMatch) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: validUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const user = await User.findByIdAndUpdate(
    validUser._id,
    { token },
    { new: true }
  );

  const { password: pass, token: tok, ...rest } = user._doc;
  res.status(200).json({ success: true, token, user: rest });
};

const updateUser = async (req, res, next) => {
  const { _id: id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedUser) {
    throw HttpError(404, "User Not Found");
  }

  const { token: tok, ...rest } = updatedUser._doc;
  res.json({
    success: true,
    user: rest,
    message: "User profile has been successfully updated!",
  });
};

const deleteUser = async (req, res, next) => {
  const { _id: id } = req.user;
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "User Not Found");
  }

  res.json({ success: true, message: "User profile successfully deleted!" });
};

const currentUser = async (req, res, next) => {
  const { password: pass, ...rest } = req.user._doc;

  res.json(rest);
};

export default {
  test: ctrlWrapper(test),
  loginUser: ctrlWrapper(loginUser),
  registerUser: ctrlWrapper(registerUser),
  updateUser: ctrlWrapper(updateUser),
  deleteUser: ctrlWrapper(deleteUser),
  currentUser: ctrlWrapper(currentUser),
};
