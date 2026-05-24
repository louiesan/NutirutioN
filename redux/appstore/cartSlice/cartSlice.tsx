"use client";

import { cart, item } from "@/apptypes/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type initialState = {
  cart: cart[];
  price: number;
};

const initialState: initialState = {
  cart: [],
  price: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    initializeCart: (state) => {
      const cart = window.localStorage.getItem("cart");
      if (cart) {
        const parsed = JSON.parse(cart);
        state.cart = parsed.cart;
        state.price = parsed.price;
      }
    },
    addToCart: (
      state,
      action: PayloadAction<{
        item: cart;
        quantities?: number;
      }>,
    ) => {
      const index = state.cart.findIndex(
        (e) => e.id === action.payload.item.id,
      );

      if (index !== -1) {
        if (action.payload.quantities) {
          state.cart[index].quantity += action.payload.quantities;
        } else {
          state.cart[index].quantity++;
        }
      } else {
        state.cart.push(action.payload.item);
        toast.success(`${action.payload.item.name} Added to cart!`, {
          duration: 2000,
          icon: "🛒",
        });
      }
      state.price = state.cart.reduce(
        (prev, currv) => prev + currv.price * currv.quantity,
        0,
      );

      window.localStorage.setItem("cart", JSON.stringify(state));
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        quantities?: number;
      }>,
    ) => {
      const index = state.cart.findIndex((e) => e.id === action.payload.id);

      if (state.cart[index].quantity > 1) {
        if (
          action.payload.quantities &&
          state.cart[index].quantity > action.payload.quantities
        ) {
          state.cart[index].quantity -= action.payload.quantities;
        } else {
          state.cart[index].quantity--;
        }
      } else {
        state.cart.splice(index, 1);
        toast.success(`Item has been Removed from cart!`, {
          duration: 2000,
          icon: "🧺",
        });
      }
      state.price = state.cart.reduce(
        (prev, currv) => prev + currv.price * currv.quantity,
        0,
      );
      window.localStorage.setItem("cart", JSON.stringify(state));
    },
    removeElement: (state, action: PayloadAction<cart>) => {
      const index = state.cart.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
        toast.success(`Item has been Removed from cart!`, {
          duration: 2000,
          icon: "🧺",
        });
      } else {
        throw new Error("Item not found");
      }
      state.price = state.cart.reduce(
        (prev, currv) => prev + currv.price * currv.quantity,
        0,
      );
      window.localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeElement, decrementQuantity, initializeCart } =
  cartSlice.actions;
