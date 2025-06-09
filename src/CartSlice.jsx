import { createSlice } from "@reduxjs/toolkit";

const removeItemLogic = (state, action) => {
  const toRemoveItemName = action.payload.name;
  state.items = state.items.filter((item) => item.name != toRemoveItemName);
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = { ...action.payload, quantity: 1 };
      state.items.push(newItem);
    },
    removeItem: (state, action) => {
      removeItemLogic(state, action);
    },
    updateQuantity: (state, action) => {
      const quantity = action.payload.quantity;
      const targetItemName = action.payload.name;

      if (quantity === 0) {
        removeItemLogic(state, action);
        return;
      }

      state.items = state.items.map((item) => {
        if (item.name === targetItemName) {
          return { ...item, quantity };
        }
        return item;
      });
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
