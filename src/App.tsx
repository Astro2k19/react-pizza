import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./scss/app.scss";

const App: React.FC  = () => {
    return (
        <div className="wrapper">
            <Header />
            <Outlet />
        </div>
    );
}

export default App;
