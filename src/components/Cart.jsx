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


 /* const handleQuantityChange = (productId, newQuantity) => {
    const productToUpdate = cartItems.find(item => item.id === productId);
    console.table("productToUpdate: "+ productToUpdate)
    if (productToUpdate) {
      const newTotalPrice = productToUpdate.price * newQuantity;
      updateCartQuantity(productId, newQuantity, newTotalPrice);
  
      // Actualizar el estado local del carrito con la nueva cantidad
      const updatedCartItems = cartItems.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      console.table("updateCart: "+ updatedCartItems); // Verifica aquí si updatedCartItems es undefined o tiene algún valor
      setCartItems(updatedCartItems);
    }
  };
*/

const handleQuantityChange = (productId, newQuantity) => {
  const product = productsWithImages.find((p) => p.id === productId);
  if (!product) {
    return;
  }
  const newTotalPrice = product.price * newQuantity;
  updateCartQuantity(productId, newQuantity, newTotalPrice);
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
        return (
        <div key={item.id} style={cardStyle}>
          <img src={product.image} alt={item.name} style={imageStyle} />
          <p>
          {item.name} - Total: ${item.totalPrice}
          </p>
          <div>
              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
              <input
                type="number"
                id={'quantity-${item.id}'}
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              />
          
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