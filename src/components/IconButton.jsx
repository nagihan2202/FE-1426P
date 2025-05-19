import { FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #dc3545;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.2s;
  
  // Butonun dikey hizalanmasını sağlayacak özellik
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle; // Dikey hizalamayı ortalar

  &:hover {
    background-color: #f8d7da;
  }

  &:focus {
    outline: none;
  }
`;

const IconButton = ({ onClick }) => (
  <Button onClick={onClick} aria-label="Ürünü sil">
    <FaTrashAlt />
  </Button>
);

export default IconButton;

