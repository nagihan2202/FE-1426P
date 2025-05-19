import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { shops } from "../data/shops";
import styled from "styled-components";

// Styled Components
const FormContainer = styled.div`
  background: #f9f9f9;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;  // Yalnızca dikey hizalama için
  gap: 10px;  // Etiket ile input arasındaki boşluk
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
  width: 100%;  // Etiketi tamamen geniş yap
`;

const Input = styled.input`
  padding: 12px 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 5px;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #999;
    font-style: italic;
  }

  &:focus {
    border-color: #28a745;
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 5px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #28a745;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 12px 25px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: #1e7e34;
  }
`;

const ProductForm = ({ onAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [selectedShop, setSelectedShop] = useState(""); // marketin id'si olacak
  const [selectedCategory, setSelectedCategory] = useState(""); // kategorinin id'si olacak

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: uuidv4(),
      name: productName,
      shop: selectedShop, // shop id'si
      category: selectedCategory, // kategori id'si
    };
    onAddProduct(newProduct);
    setProductName(""); // Reset the form after submission
    setSelectedShop(""); // Reset the shop selection
    setSelectedCategory(""); // Reset the category selection
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        {/* Ürün Adı, Market ve Kategori aynı satırda */}
        <FormGroup>
          <Label htmlFor="productName">Ürün Adı</Label>
          <Input
            type="text"
            id="productName"
            placeholder="Ürün adını girin"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="productShop">Market</Label>
          <Select
            id="productShop"
            value={selectedShop}
            onChange={(e) => setSelectedShop(e.target.value)}
            required
          >
            <option value="">Market Seçin</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="productCategory">Kategori</Label>
          <Select
            id="productCategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Kategori Seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        {/* Ürün Ekle Butonu */}
        <SubmitButton type="submit">Ürün Ekle</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default ProductForm;


