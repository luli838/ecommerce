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
  console.log("Datos del producto:", prod);
  const multipleImages = Array.isArray(prod.images) && prod.images.length > 1;
  // Función para parsear la cadena de imagen si es necesario
  const parseImages = (images) => {
    try {
      // Intenta parsear la cadena a un array
      const parsedImages = JSON.parse(images);
      // Si se pudo parsear y es un array, devuelve ese array
      if (Array.isArray(parsedImages)) {
        return parsedImages;
      }
    } catch (error) {
      // Si hay un error al parsear, devuelve el valor original
      return images;
    }
    // Si no se pudo parsear, devuelve el valor original
    return images;
  };

  // Función para obtener la URL de la imagen de la cadena JSON
  const getImageUrl = (imageString) => {
    try {
      // Parsea la cadena JSON para obtener la URL de la imagen
      const parsedImage = JSON.parse(imageString);
      // Si el resultado es una cadena, la devuelve como la URL de la imagen
      if (typeof parsedImage === "string") {
        return parsedImage;
      }
    } catch (error) {
      // Si hay un error al parsear, devuelve la cadena original
      return imageString;
    }
    // Si no se pudo parsear, devuelve la cadena original
    return imageString;
  };

  // Obtén el array de imágenes para renderizar
  const imagesToRender = multipleImages ? prod.images : parseImages(prod.images);



  return (
    <div style={card}>
      <h3>{prod.title}</h3>
      <div style={cardInnerContainer}>
      {/* Verifica si hay más de una imagen */}
      {Array.isArray(imagesToRender) ? (
          // Si hay más de una imagen, muestra todas
          imagesToRender.map((imageUrl, index) => (
            <img
            key={index}
            src={getImageUrl(imageUrl)}
            alt={`${prod.title} - Imagen ${index + 1}`}
            style={{ width: "20%", aspectRatio: "auto", marginBottom: "10px" }}
            />
          ))
        ) : (
          // Si hay solo una imagen, muestra esa única imagen
          <img
          src={getImageUrl(imagesToRender)}
          alt={`${prod.title} - Imagen 1`}
          style={{ width: "20%", aspectRatio: "auto", marginBottom: "10px" }}
          />
        )}
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
