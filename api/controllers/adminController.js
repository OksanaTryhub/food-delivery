import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Admin } from "./../models/adminModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

dotenv.config();
const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

const test = async (req, res) => {
  res.send("Hello test");
};

const registerAdmin = async (req, res, next) => {
  const { name, password, email } = req.body;

  const isAdminExists = await Admin.findOne({ email });
  if (isAdminExists) {
    throw HttpError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  const payload = {
    id: newAdmin._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const admin = await Admin.findByIdAndUpdate(
    newAdmin._id,
    { token },
    { new: true }
  );
  const { password: pass, token: tok, ...rest } = admin._doc;

  res.status(201).json({ success: true, token, admin: rest });
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw HttpError(401, "Email or password invalid");
  }

  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: admin._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
  const updatedAdmin = await Admin.findByIdAndUpdate(
    admin._id,
    { token },
    { new: true }
  );

  const { password: pass, token: tok, ...rest } = updatedAdmin._doc;
  res.json({ success: true, token, admin: rest });
};

const logoutAdmin = async (req, res, next) => {
  const { _id } = req.user;
  console.log("🚀 ~ logoutAdmin ~ req.user:", req.user);

  await Admin.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Admin has been logged out!" });
};

const getCurrentAdmin = async (req, res, next) => {
  const { password: pass, ...rest } = req.user._doc;

  res.json(rest);
};

const updateAdmin = async (req, res, next) => {
  const { _id } = req.user;
  const updatedAdmin = await Admin.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!updatedAdmin) {
    throw HttpError(404, "Admin Not Found");
  }
  const { token: tok, ...rest } = updatedAdmin._doc;
  res.json({
    success: true,
    admin: rest,
    message: "Admin account has been successfully updated!",
  });
};

const deleteAdmin = async (req, res, next) => {
  const { _id: id } = req.user;
  const result = await Admin.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Admin Not Found");
  }
  res.json({ success: true, message: "Admin account successfully deleted!" });
};

export default {
  test: ctrlWrapper(test),
  loginAdmin: ctrlWrapper(loginAdmin),
  registerAdmin: ctrlWrapper(registerAdmin),
  getCurrentAdmin: ctrlWrapper(getCurrentAdmin),
  logoutAdmin: ctrlWrapper(logoutAdmin),
  updateAdmin: ctrlWrapper(updateAdmin),
  deleteAdmin: ctrlWrapper(deleteAdmin),
};
