import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import EmptyCart from "./components/EmptyCart";
import Home from "./pages/Home";

import { Provider } from "react-redux";
import store from "./redux/store";
import PizzaBlockSingle from "./components/PizzaBlock/PizzaBlockSingle.js";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="pizza/:pizzaId" element={<PizzaBlockSingle />} />
              <Route path="cart" element={<Cart />} />
              <Route path="empty-cart" element={<EmptyCart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
  );
}

