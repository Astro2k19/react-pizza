import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../App";
import Home from "../pages/Home";
import { PizzaBlockSingle, EmptyCart } from "./index.js";
import { Cart } from "../pages/Cart";
import { NotFoud } from "../pages/NotFound";

import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

const MainLayout: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" index element={<Home />} />
              <Route path="pizza/:pizzaId" element={<PizzaBlockSingle />} />
              <Route path="cart" element={<Cart />} />
              <Route path="empty-cart" element={<EmptyCart />} />
              <Route path="*" element={<NotFoud />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default MainLayout;
