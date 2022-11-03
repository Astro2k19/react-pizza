import * as React from "react";
import * as ReactDOM from "react-dom/client";

import MainLayout from "./components/MainLayout";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(<MainLayout />);
}

