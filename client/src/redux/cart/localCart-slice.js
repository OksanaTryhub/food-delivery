import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localCart: JSON.parse(localStorage.getItem("localCart")) || {},
};

const localCartSlice = createSlice({
  name: "localCart",
  initialState,
  reducers: {
    addToCartLoc(state, action) {
      const { itemId } = action.payload;
      if (!state.localCart[itemId]) {
        state.localCart[itemId] = 1;
      } else {
        state.localCart[itemId] += 1;
      }
      localStorage.setItem("localCart", JSON.stringify(state.localCart));
    },
    decreaseCartItemLoc(state, action) {
      const { itemId } = action.payload;
      if (state.localCart[itemId] && state.localCart[itemId] > 0) {
        state.localCart[itemId] -= 1;
      }
      localStorage.setItem("localCart", JSON.stringify(state.localCart));
    },
    deleteItemCartLoc(state, action) {
      const { itemId } = action.payload;
      if (state.localCart[itemId]) {
        delete state.localCart[itemId];
      }
      localStorage.setItem("localCart", JSON.stringify(state.localCart));
    },
    clearCartLoc(state) {
      state.localCart = {};
      localStorage.removeItem("localCart");
    },
  },
});

export const {
  addToCartLoc,
  decreaseCartItemLoc,
  deleteItemCartLoc,
  clearCartLoc,
} = localCartSlice.actions;
export default localCartSlice.reducer;
