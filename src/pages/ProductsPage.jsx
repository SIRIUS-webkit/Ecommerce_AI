import React from "react";
import Header from "../components/Header";
import Products from "../components/Products";
import SearchBar from "../components/SearchBar";

function ProductsPage() {
  return (
    <>
      <Header />
      <SearchBar />
      <Products />
    </>
  );
}

export default ProductsPage;
