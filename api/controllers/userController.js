import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();
const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

const registerUser = async (req, res) => {
  const { username, password, email, cartData } = req.body;

  try {
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
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

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      cartData,
    });

    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const { password: pass, ...rest } = newUser._doc;
    res.status(201).json({ success: true, token, user: rest });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res
        .status(401)
        .json({ success: false, message: "Email or password invalid" });
    }

    const isPasswordMatch = await bcrypt.compare(password, validUser.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Email or password invalid" });
    }

    const payload = {
      id: validUser._id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json({ success: true, token, user: rest });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser };
