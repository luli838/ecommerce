
import { MdShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { getTotalCartPrice } from "../utils/getTotalCartPrice";

function CartSummary() {
  const { cart } = useContext(productsContext);
  return cart?.length ? (
    <>
      <Link to="/cart">
        <MdShoppingCart size={30} color="black" />{" "}
      </Link>
      <span>${getTotalCartPrice(cart)}</span>
    </>
  ) : (
    <p>empty cart</p>
  );
}

export default CartSummary;