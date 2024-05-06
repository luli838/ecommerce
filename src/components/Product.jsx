import React from "react";
import {
  card,
  cardBtn,
  cardInnerContainer,
  cardPriceBtn,
  cardPrice,
  cardBtnDisabled,
} from "../styles/cardStyles";
function Product({ prod }) {
  return (
    <div style={card}>
      <h3>{prod.title}</h3>
      <div style={cardInnerContainer}>
      {prod.images.map((imageUrl, index) => (
         <img
         key={index}
         src={imageUrl}
         alt={`${prod.title} - Imagen ${index + 1}`}
         style={{ width: "20%", aspectRatio: "auto", marginBottom: "10px" }}
       />
     ))}
        <div style={cardPriceBtn}>
          <p style={cardPrice}>${prod.price}</p>
          <button style={cardBtn}>shop</button>
        </div>
      </div>
      <p>{prod.description.slice(0, 40)}...</p>
    </div>
  );
}

export default Product;
