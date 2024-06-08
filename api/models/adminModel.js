import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../utils/handleMongooseError.js";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlehgth: 8,
      required: true,
    },
    // foodItems: {
    //   type: Array,
    //   default: [],
    // },
    token: {
      type: String,
      default: "",
    },
  },
  {
    minimize: false,
    versionKey: false,
    timestamps: true,
  }
);

adminSchema.post("save", handleMongooseError);

// JOI validation
const registerAdminSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required().messages({
    "string.base": `"password" should be a type of 'text'`,
    "string.empty": `"password" cannot be an empty field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),
});

const loginAdminSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().messages({
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `"password" is a required field`,
  }),
});

const schemas = {
  registerAdminSchema,
  loginAdminSchema,
};

const Admin = model("admin", adminSchema);

export { Admin, schemas };
