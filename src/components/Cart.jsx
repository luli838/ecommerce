import { useContext, useEffect, useState } from "react";
import { productsContext } from "../context/ProductsContext";
import { getDerivedCart } from "../utils/getDerivedCart";
import { Link } from "react-router-dom";
import { cardBtn, cardStyle, imageStyle } from "../styles/cardStyles";
import { getAllProducts } from "../services/productService";

function Cart() {
  const { cart, removeFromCart,updateCartQuantity} = useContext(productsContext);
  const derivedCart = getDerivedCart(cart);
  const [productsWithImages, setProductsWithImages] = useState([]);
  const [quantities, setQuantities] = useState({}); // Estado para las cantidades seleccionadas
  const [totalPrices, setTotalPrices] = useState({}); // Estado para los precios totales

  // Manejar cambios en la cantidad seleccionada
  const handleQuantityChange = (event, productId) => {
    const newQuantity = parseInt(event.target.value); // Convertir el valor a un entero
    const totalPrice = newQuantity * productsWithImages.find(p => p.id === productId).price; // Calcular el nuevo precio total
    setQuantities({ ...quantities, [productId]: newQuantity }); // Actualizar el estado de las cantidades seleccionadas
    setTotalPrices({ ...totalPrices, [productId]: totalPrice }); // Actualizar el estado de los precios totales
  };

  useEffect(() => {
    const fetchProductsWithImages = async () => {
      try {
        const products = await getAllProducts();
        setProductsWithImages(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    
    };

    fetchProductsWithImages();
  }, []);

  return (
    <article>
      {derivedCart.map((item) => {
        const product = productsWithImages.find((p) => p.id === item.id);
        
        if (!product) {
          // Maneja el caso donde el producto no se encuentra en la lista de productos con imágenes
          return null;
        }
        const totalPrice = totalPrices[item.id] || item.totalPrice; // Obtener el precio total actualizado si existe
        return (
        <div key={item.id} style={cardStyle}>
          <img src={product.image} alt={item.name} style={imageStyle} />
          <p>
          {item.name} - Total: ${totalPrice} - Cantidad: {item.quantity}
          </p>
          <div>
              <label htmlFor={'quantity-${item.id}'}>Quantity:</label>
              <select
                id={`quantity-${item.id}`}
                value={quantities[item.id] || item.quantity} // Valor predeterminado: 1
                onChange={(event) => handleQuantityChange(event, item.id)}
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
          
            <button style={cardBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
        );
      })}
      <Link to={-1}>Back</Link>
    </article>

  );
}

export default Cart;