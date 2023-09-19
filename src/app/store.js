import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todoSlice";
import cartReducer from "../redux/cartSlice";
import detailReducer from "../redux/detailSlice";

export const store = configureStore({
  reducer: {
    task: todoReducer,
    cart: cartReducer,
    detail: detailReducer,
  },
  // đặt là tast thì khi dùng selector lấy tên đó
});
