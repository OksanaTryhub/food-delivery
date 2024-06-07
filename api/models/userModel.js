import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../utils/handleMongooseError.js";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    token: {
      type: String,
      default: "",
    },
  },
  { minimize: false, versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

// JOI validation
const registerUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required().messages({
    "string.base": `"password" should be a type of 'text'`,
    "string.empty": `"password" cannot be an empty field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `"password" is a required field`,
  }),
});

const schemas = {
  registerUserSchema,
  loginUserSchema,
};

const User = model("user", userSchema);

export { User, schemas };
