import { User } from "../models/userModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const updateCartData = async (req, res, next) => {
  const { _id: id } = req.user;
  const data = req.body;

  for (const itemId in data) {
    const quantity = data[itemId];

    const user = await User.findById(id);
    const currentCart = user.cartData || {};
    if (currentCart[itemId]) {
      currentCart[itemId] += quantity;
    } else {
      currentCart[itemId] = quantity;
    }

    await User.findByIdAndUpdate(id, { cartData: currentCart }, { new: true });
  }

  const updatedUser = await User.findById(id);

  res.json({
    success: true,
    updatedCart: updatedUser.cartData,
    message: "Cart updated successfully!",
  });
};

const addItemToCart = async (req, res, next) => {
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

const decreaseCartItemQuantity = async (req, res, next) => {
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

const deleteCartItem = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const user = await User.findById(userId);
  const currentCart = user.cartData || {};

  if (!currentCart[id]) {
    throw HttpError(404, "Item Not Found!");
  }
  delete currentCart[id];
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { cartData: currentCart },
    { new: true }
  );

  res.json({
    success: true,
    updatedCart: updatedUser.cartData,
    message: "Item deleted successfully!",
  });
};

const clearCart = async (req, res, next) => {
  const { _id: id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { cartData: {} },
    { new: true }
  );

  const { password: pass, token: tok, ...rest } = updatedUser._doc;

  res.json({
    success: true,
    user: rest,
    message: "All items have been removed from your cart.",
  });
};
const getCartData = async (req, res, nex) => {
  const { _id: id } = req.user;
  const { cartData } = await User.findById(id);

  res.json({ success: true, cartData });
};

export default {
  addItemToCart: ctrlWrapper(addItemToCart),
  updateCartData: ctrlWrapper(updateCartData),
  decreaseCartItemQuantity: ctrlWrapper(decreaseCartItemQuantity),
  deleteCartItem: ctrlWrapper(deleteCartItem),
  clearCart: ctrlWrapper(clearCart),
  getCartData: ctrlWrapper(getCartData),
};
