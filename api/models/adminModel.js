import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
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
    foodItems: {
      type: Array,
      default: [],
    },
  },
  { minimize: false, versionKey: false, timestamps: true }
);

const Admin = model("admin", adminSchema);

export default Admin;
