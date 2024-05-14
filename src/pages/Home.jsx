import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Product from "../components/Product";
import { getAllProducts } from "../services/productService";
import "./Home.css";
import CartSummary from "../components/CartSummary";

function Home() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  
  return (
    <>
      <Header>
        <Navbar />
        <h1>Productos Destacados</h1>
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
                  columnGap: "5em",
                }}
              >             
            </div>
            <CartSummary />
        </div>
      </Header>
      <main className="containerHome">
          {products.map((product) => (
                  <Product
                    prod={product} 
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    imageSrc={product.image}
                  />
            ))}
        
      </main>
    </>
  );
}

export default Home;
