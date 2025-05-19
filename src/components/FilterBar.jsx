import React from "react";
import styled from "styled-components";

// 💅 Styled Components
const FilterWrapper = styled.div`
  background: #ffffff;
  padding: 20px;
  margin: 30px auto;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 150px;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 6px;
`;

const Select = styled.select`
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #28a745;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #28a745;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RadioLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterBar = ({
  shops,
  categories,
  filteredShopId,
  setFilteredShopId,
  filteredCategoryId,
  setFilteredCategoryId,
  filteredStatus,
  setFilteredStatus,
  filteredName,
  setFilteredName,
}) => {
  return (
    <FilterWrapper>
      <FilterGroup>
        <Label htmlFor="shopFilter">Market</Label>
        <Select
          id="shopFilter"
          value={filteredShopId}
          onChange={(e) => setFilteredShopId(e.target.value)}
        >
          <option value="">Tüm Marketler</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label htmlFor="categoryFilter">Kategori</Label>
        <Select
          id="categoryFilter"
          value={filteredCategoryId}
          onChange={(e) => setFilteredCategoryId(e.target.value)}
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label htmlFor="searchInput">Ürün Ara</Label>
        <Input
          type="text"
          id="searchInput"
          placeholder="Ürün adı..."
          value={filteredName}
          onChange={(e) => setFilteredName(e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <Label>Durum</Label>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              value="all"
              checked={filteredStatus === "all"}
              onChange={(e) => setFilteredStatus(e.target.value)}
            />{" "}
            Tümü
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              value="bought"
              checked={filteredStatus === "bought"}
              onChange={(e) => setFilteredStatus(e.target.value)}
            />{" "}
            Satın Alınanlar
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              value="notBought"
              checked={filteredStatus === "notBought"}
              onChange={(e) => setFilteredStatus(e.target.value)}
            />{" "}
            Satın Alınmayanlar
          </RadioLabel>
        </RadioGroup>
      </FilterGroup>
    </FilterWrapper>
  );
};

export default FilterBar;
