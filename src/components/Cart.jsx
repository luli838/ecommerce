import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../context/ProductsContext";
import { getDerivedCart } from "../utils/getDerivedCart";
import { NavLink  } from "react-router-dom";
import { cardBtn, cardStyle, imageStyle } from "../styles/cardStyles";
import { getAllProducts } from "../services/productService";
import FormLogin from "./FormLogin";


function Cart() {
  
  const { cart, removeFromCart,updateCartQuantity} = useContext(productsContext);
  const derivedCart = getDerivedCart(cart);
  const [productsWithImages, setProductsWithImages] = useState([]);
  const [quantities, setQuantities] = useState({}); // Estado para las cantidades seleccionadas
  const [totalPrices, setTotalPrices] = useState({}); // Estado para los precios totales
  const [finalTotal, setFinalTotal] = useState(0); // Estado para el total final

  const [showLoginForm, setShowLoginForm] = useState(false);


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

  useEffect(() => {
    // Calcular el total final
    const total = derivedCart.reduce((acc, item) => {
      const totalPrice = totalPrices[item.id] || item.totalPrice;
      return acc + totalPrice;
    }, 0);
    setFinalTotal(total);
  }, [derivedCart, totalPrices]);


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
          {item.name} - Total: ${totalPrice} 
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
      <p>Total de compra: ${finalTotal}</p>
      <nav>
      <button style={{ backgroundColor: '#c5c6c8', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', margin: "10px", }}>
      <NavLink
        to={-1}
      >
        Back
      </NavLink>
      </button>
      <button style={{ backgroundColor: '#c5c6c8', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', margin: "10px", }} 
         onClick={() => setShowLoginForm(true)} >
      <NavLink to='/login'>
        Buy
      </NavLink>
      </button>
      {showLoginForm && <LoginForm />}
      </nav>

    </article>

  );
}

export default Cart;