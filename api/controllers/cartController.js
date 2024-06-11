import { User } from "../models/userModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const cartTest = async (req, res) => {
  res.send("I'm in the Cart!");
};
const addToCart = async (req, res, next) => {
  const { _id: id } = req.user;
  const { itemId } = req.body;
  const { cartData } = await User.findById(id);

  if (!cartData[itemId]) {
    cartData[itemId] = 1;
  } else {
    cartData[itemId] += 1;
  }

  const { cartData: updatedCart } = await User.findByIdAndUpdate(
    id,
    { cartData },
    { new: true }
  );

  res.json({ success: true, updatedCart, message: "Item added to Cart!" });
};

const removeFromCart = async (req, res, next) => {
  const { _id: id } = req.user;
  const { itemId } = req.body;
  const { cartData } = await User.findById(id);

  if (cartData[itemId] > 0) {
    cartData[itemId] -= 1;
  }
  const { cartData: updatedCart } = await User.findByIdAndUpdate(
    id,
    { cartData },
    { new: true }
  );
  res.json({ success: true, updatedCart, message: "Item removed from Cart!" });
};

const getCartData = async (req, res, nex) => {
  const { _id: id } = req.user;
  const { cartData } = await User.findById(id);

  res.json({ success: true, cartData });
};

export default {
  cartTest: ctrlWrapper(cartTest),
  addToCart: ctrlWrapper(addToCart),
  removeFromCart: ctrlWrapper(removeFromCart),
  getCartData: ctrlWrapper(getCartData),
};
