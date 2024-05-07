import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { ProductsContextProvider } from "./context/ProductsContext";
import Cart from "./components/Cart";
function App() {
  return (
    <BrowserRouter>
      <ProductsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </ProductsContextProvider>
    </BrowserRouter>
  );
}

export default App;
