import React from "react";
import ProductList from "../../components/productList/ProductList";
import Header from "../header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <section>
        <ProductList />
      </section>
    </>
  );
}
