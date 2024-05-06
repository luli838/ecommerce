import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { ProductsContextProvider } from "./context/ProductsContext";
function App() {
  return (
    <BrowserRouter>
      <ProductsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<h2>Cart</h2>} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </ProductsContextProvider>
    </BrowserRouter>
  );
}

export default App;
