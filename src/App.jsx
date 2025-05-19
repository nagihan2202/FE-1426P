import React, { useState, useMemo } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Fuse from "fuse.js";

import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import FilterBar from "./components/FilterBar";

import { categories } from "./data/categories";
import { shops } from "./data/shops";

// 🌐 Global stil tanımı
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0f2f5;
    color: #333;
  }

  h1, h2, h3, h4, h5 {
    margin: 0;
  }

  button {
    font-family: inherit;
  }
`;

// Ana container
const AppContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

// Başlık
const Title = styled.h1`
  text-align: center;
  color: #28a745;
  margin-bottom: 40px;
  font-size: 2.2rem;
`;

function App() {
  const [products, setProducts] = useState([]);
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [filteredName, setFilteredName] = useState("");

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, isBought: false }]);
  };

  const handleToggleBought = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, isBought: !product.isBought }
          : product
      )
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  // Fuzzy arama
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name"],
      threshold: 0.3,
    });
  }, [products]);

  const fuzzyResult = useMemo(() => {
    return filteredName
      ? fuse.search(filteredName).map((res) => res.item)
      : products;
  }, [filteredName, fuse, products]);

  // Filtreleme
  const filteredProducts = useMemo(() => {
    return fuzzyResult
      .filter((product) =>
        filteredShopId ? product.shop === filteredShopId : true
      )
      .filter((product) =>
        filteredCategoryId ? product.category === filteredCategoryId : true
      )
      .filter((product) => {
        if (filteredStatus === "bought") return product.isBought;
        if (filteredStatus === "notBought") return !product.isBought;
        return true;
      });
  }, [fuzzyResult, filteredShopId, filteredCategoryId, filteredStatus]);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Title>🛒 Alışveriş Listesi</Title>

        <ProductForm onAddProduct={handleAddProduct} />

        <FilterBar
          shops={shops}
          categories={categories}
          filteredShopId={filteredShopId}
          setFilteredShopId={setFilteredShopId}
          filteredCategoryId={filteredCategoryId}
          setFilteredCategoryId={setFilteredCategoryId}
          filteredStatus={filteredStatus}
          setFilteredStatus={setFilteredStatus}
          filteredName={filteredName}
          setFilteredName={setFilteredName}
        />

        <ProductTable
          products={filteredProducts}
          setProducts={setProducts}
          categories={categories}
          shops={shops}
          handleToggleBought={handleToggleBought}
          handleDeleteProduct={handleDeleteProduct}
        />
      </AppContainer>
    </>
  );
}

export default App;
