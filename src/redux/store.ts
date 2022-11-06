import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import pizzasReducer from "./slices/PizzasSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    pizzas: pizzasReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
