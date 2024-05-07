
import { MdShoppingCart} from "react-icons/md";
import { MdAddShoppingCart} from "react-icons/md";
import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { getTotalCartPrice } from "../utils/getTotalCartPrice";
import { cartSummary } from "../styles/cardStyles";

function CartSummary() {
  const { cart } = useContext(productsContext);
  return cart?.length ? (
    <div  style={cartSummary}>
      <Link to="/cart">
        <MdShoppingCart size={20} color="black" />{" "}
      </Link>
      <span>${getTotalCartPrice(cart)}</span>
    </div>
  ) : (
    
    <MdAddShoppingCart size={30} />
  );
}

export default CartSummary;