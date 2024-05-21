import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();
const { DB_HOST } = process.env;

export const connectDB = async () => {
  await mongoose
    .connect(DB_HOST)
    .then(() => console.log("DB Connected"))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};
