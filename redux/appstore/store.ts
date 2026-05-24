import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/redux/appstore/cartSlice/cartSlice";

export const store = configureStore({
  reducer: {
    cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
