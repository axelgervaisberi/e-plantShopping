import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        // If the item already exists, update its quantity
        existingItem.quantity++;
      } else {
        // If the item doesn't exist, add it to the cart with its details
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
      state.totalQuantity++;
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(
          (item) => item.name !== action.payload
        );
      }
    },

    updateQuantity: (state, action) => {
      const { name, quantity, totalQuantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;
        state.totalQuantity = totalQuantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
