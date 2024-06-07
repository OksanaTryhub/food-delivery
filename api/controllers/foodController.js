import { Food } from "../models/foodModel.js";
import HttpError from "./../helpers/HttpError.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const getFoodList = async (req, res, next) => {
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;
  // const data = await Food.find({}, null, {
  //   skip,
  //   limit,
  // });
  const data = await Food.find();
  res.status(200).json({ success: true, data });
};

const getFoodListByOwner = async (req, res, next) => {
  const { _id: owner } = req.user;

  const data = await Food.find({ owner }).populate("owner", "name email");
  res.status(200).json(data);
};

const addFoodItem = async (req, res, next) => {
  const { _id: owner } = req.user;
  const foodItem = await Food.create({ ...req.body, owner });

  return res
    .status(201)
    .json({ foodItem, success: true, message: "Food Added" });
};

const getFoodItem = async (req, res, next) => {
  const { id } = req.params;
  const item = await Food.findById(id);
  if (!item) {
    throw HttpError(404, `Item with ${id} Not Found`);
  }
  res.status(200).json({ success: true, item });
};

const updateFoodItem = async (req, res, next) => {
  const { id } = req.params;
  const updatedItem = await Food.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedItem) {
    throw HttpError(404, `Item with ${id} Not Found`);
  }

  res.json({ success: true, updatedItem });
};

const deleteFoodItem = async (req, res, next) => {
  const { id } = req.params;
  const removedItem = await Food.findByIdAndDelete(id);
  if (!removedItem) {
    throw HttpError(404, `Item with ${id} Not Found`);
  }

  res.json({ success: true, message: "Food Item has been deleted!" });
};

export default {
  addFoodItem: ctrlWrapper(addFoodItem),
  getFoodList: ctrlWrapper(getFoodList),
  getFoodListByOwner: ctrlWrapper(getFoodListByOwner),
  getFoodItem: ctrlWrapper(getFoodItem),
  updateFoodItem: ctrlWrapper(updateFoodItem),
  deleteFoodItem: ctrlWrapper(deleteFoodItem),
};
