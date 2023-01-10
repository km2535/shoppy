import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import ProductDetail from "./components/productDetail/ProductDetail";
import AddProduct from "./components/addProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: "/",
        element: <Home />,
      },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/product/addProduct", element: <AddProduct /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
