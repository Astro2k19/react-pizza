import React from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import App from "../App";
import Home from "../pages/Home";
import PizzaBlockSingle from "./PizzaBlock/PizzaBlockSingle";
import Cart from "../pages/Cart";
import EmptyCart from "./EmptyCart";
import NotFound from "../pages/NotFound";
import store from "../redux/store";

const MainLayout: React.FC = () => {
    return (
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
    )
}

export default MainLayout;