import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import pizzasReducer from "./slices/PizzasSlice";
import cartReducer from "./slices/cartSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  filter: filterReducer,
  pizzas: pizzasReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
