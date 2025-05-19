import React from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import IconButton from "./IconButton";
import confetti from "canvas-confetti";
import { Container } from "react-bootstrap";

// Satırın stilini oluşturuyoruz
const StrikeRow = styled.tr`
  text-decoration: ${(props) => (props.bought ? "line-through" : "none")};
  background-color: ${(props) =>
    props.index % 2 === 0 ? "#f8f9fa" : "#e9ecef"};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d6e2e9;
    cursor: pointer;
  }
`;

const ProductTable = ({
  products,
  setProducts,
  categories,
  shops,
  handleDeleteProduct,
}) => {
  
  // Satır tıklama işlemi (Satın Alındı durumu değiştirilir)
  const handleRowClick = (id) => {
    setProducts((prevProducts) => {
      const updated = prevProducts.map((item) =>
        item.id === id ? { ...item, isBought: !item.isBought } : item
      );

      // Önceden tüm ürünler satın alınmış mıydı, yeni durumda tüm ürünler satın alındı mı?
      const wasAllBoughtBefore = prevProducts.every((p) => p.isBought);
      const isAllBoughtAfter = updated.length > 0 && updated.every((p) => p.isBought);

      // Eğer tüm ürünler satın alındıysa, kullanıcıya bir tebrik mesajı gösteriyoruz
      if (!wasAllBoughtBefore && isAllBoughtAfter) {
        alert("🎉 Alışveriş Tamamlandı!");
        confetti();  // Confetti animasyonunu tetikliyoruz
      }

      return updated;
    });
  };

  // Kategori ve market isimlerini ID'ye göre alıyoruz
  const getNameById = (id, list) =>
    list.find((item) => item.id === id)?.name || "";

  return (
    <Container style={{ paddingTop: "20px" }}>
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: "#007bff", color: "white" }}>
          <tr>
            <th>Ürün</th>
            <th>Kategori</th>
            <th>Market</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <StrikeRow
              key={product.id}
              bought={product.isBought} // Satın alındı durumu
              index={index} // Satır sırası (rengi değiştirmek için kullanılıyor)
              onClick={() => handleRowClick(product.id)} // Satır tıklama işlemi
            >
              <td>{product.name}</td>
              <td>{getNameById(product.category, categories)}</td>
              <td>{getNameById(product.shop, shops)}</td>
              <td>
                {/* Silme butonu */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // Satırın tıklanmasını engelle
                    handleDeleteProduct(product.id); // Ürünü sil
                  }}
                />
              </td>
            </StrikeRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductTable;
