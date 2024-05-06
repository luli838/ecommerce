import React, { useContext } from "react";
import Product from "../components/Product";
import "./Products.css";

import { productsContext } from "../context/ProductsContext";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sort from "../components/Sort";
import FilterByPrice from "../components/FilterByPrice";

function Products() {
  const { products, isLoading, error, maxPrice, query } =
    useContext(productsContext);

  return (
    <>
      <Header>
        <Navbar />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2em",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "1em",
            }}
          >
            <input type="search" name="" id="" placeholder="Search..." />
            <Sort />
            <FilterByPrice />
          </div>
          <button style={{ backgroundColor: '#b0f2c2', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}> 🛒</button>
          
        </div>
      </Header>
      <main className="container">
        {products
          .filter(
            (prod) => prod.price <= maxPrice && prod.title.includes(query)
          )
          .map((prod) => (
            <Product prod={prod} key={prod.id} />
          ))}
      </main>
    </>
  );
}

export default Products;
