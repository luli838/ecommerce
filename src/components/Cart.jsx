import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
//import { getDerivedCart } from "../utils/getDerivedCart";
import { getDerivedCart } from "../utils/getDerivedCart";

import { Link } from "react-router-dom";
function Cart() {
  const { cart, removeFromCart } = useContext(productsContext);
  const derivedCart = getDerivedCart(cart);
  return (

   
    <article>
      {derivedCart.map((item) => (
        <p onClick={() => removeFromCart(item.id)}>
          {item.name} - {item.quantity} - {item.totalPrice}
        </p>
      ))}
      <Link to={-1}>Back</Link>
    </article>
  );
}

export default Cart;