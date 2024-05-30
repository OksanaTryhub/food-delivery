// import path from "path";
import Food from "../models/foodModel.js";

// const __dirname = path.resolve();

const test = async (req, res) => {
  try {
    res.send("API working!");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addFoodItem = async (req, res) => {
  console.log("🚀 ~ addFoodItem ~ req.body:", req.body);
  try {
    const newFood = await Food.create({
      ...req.body,
    });

    return res.status(201).json({ newFood, success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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

    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Food Item has been deleted!" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error deleting Food Item" });
  }
};

export { test, addFoodItem, getFoodList, removeFoodItem };
