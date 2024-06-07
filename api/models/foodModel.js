import { Schema, model } from "mongoose";
import Joi from "joi";
import {
  categoryValidator,
  validCategories,
} from "../helpers/categoryValidator.js";
import handleMongooseError from "../utils/handleMongooseError.js";

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      validate: categoryValidator,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

foodSchema.post("save", handleMongooseError);

//JOI validation
const addFoodSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Field "name" is required`,
  }),
  description: Joi.string().required().messages({
    "any.required": `Field "description" is required`,
  }),
  price: Joi.number().required().messages({
    "any.required": `Field "price" is required`,
  }),
  image: Joi.string().required().messages({
    "any.required": `Field "image" is required`,
  }),
  category: Joi.string()
    .valid(...validCategories)
    .required()
    .messages({
      "any.required": `"category" is required`,
      "any.only": `"{category}" is invalid category. Valid categories are: ${validCategories.join(
        ", "
      )}`,
    }),
});

const schemas = {
  addFoodSchema,
};

const Food = model("food", foodSchema);

export { Food, schemas };
