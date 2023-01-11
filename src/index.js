import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import ProductDetail from "./pages/productDetail/ProductDetail";
import AddProduct from "./components/addProduct/AddProduct";
import ShopingList from "./pages/shopingList/ShopingList";
import ProductList from "./pages/productList/ProductList";

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
      { path: "/shopingList", element: <ShopingList /> },
      { path: "/products", element: <ProductList /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/product/addProduct", element: <AddProduct /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
