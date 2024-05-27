import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import dotenv from "dotenv";
import Admin from "./../models/adminModel.js";

dotenv.config();
const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

const test = async (req, res) => {
  try {
    res.send("Hello test");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const registerAdmin = async (req, res) => {
  const { name, password, email, foodItems } = req.body;
  console.log("🚀 ~ registerAdmin ~ req.body:", req.body);

  try {
    const isAdminExists = await Admin.findOne({ email });
    if (isAdminExists) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      foodItems,
    });

    const payload = {
      id: newAdmin._id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const { password: pass, ...rest } = newAdmin._doc;
    res.status(201).json({ success: true, token, admin: rest });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ success: false, message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validAdmin = await Admin.findOne({ email });

    if (!validAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Email or password invalid" });
    }

    const isPasswordMatch = await bcrypt.compare(password, validAdmin.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Email or password invalid" });
    }

    const payload = {
      id: validAdmin._id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const { password: pass, ...rest } = validAdmin._doc;
    res.status(200).json({ success: true, token, admin: rest });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ success: false, message: error.message });
  }
};

export { test, loginAdmin, registerAdmin };
