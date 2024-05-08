import { useContext } from "react";
import { productsContext } from "../context/ProductsContext";

function FilterByPrice() {
  const { maxPrice, handleMaxPrice } = useContext(productsContext);
  return (
    <div>
      <p style={{ textAlign: "center" }}>Top price ${maxPrice}</p>
      <input
        style={{
          accentColor: "black",
          background: "lightblue",
          appearance: "none",

          width: "120px",
        }}
        type="range"
        name="maxPrice"
        id="maxPrice"
        min={0}
        max={1000}
        step={5}
        defaultValue={1000}
        onChange={(e) => handleMaxPrice(Number(e.target.value))}
      />
      
    </div>
  );
}

export default FilterByPrice;
