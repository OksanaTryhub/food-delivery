import path from "path";
import Food from "../models/foodModel.js";
import fs from "fs";

const __dirname = path.resolve();

const addFoodItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    let image_filename = `${req.file.filename}`;

    const newFood = await Food.create({
      ...req.body,
      image: image_filename,
    });

    return res.status(201).json({ newFood, success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding food" });
  }
};

const getFoodList = async (req, res) => {
  try {
    const data = await Food.find({});
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error getting food list" });
  }
};

const removeFoodItem = async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);
    const imagePath = path.join(__dirname, "api", "uploads", foodItem.image);

    if (!foodItem) {
      return console.log("Food Item not found!");
    } else {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        } else {
          console.log(`Image ${foodItem.image} deleted`);
        }
      });
    }

    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Food Item has been deleted!" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error deleting Food Item" });
  }
};

export { addFoodItem, getFoodList, removeFoodItem };
