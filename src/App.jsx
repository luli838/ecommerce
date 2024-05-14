import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { ProductsContextProvider } from "./context/ProductsContext";
import Cart from "./components/Cart";
import FormLogin from "./components/FormLogin";


function App() {
  return (
    <BrowserRouter>
      <ProductsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<FormLogin />} />
        </Routes>
      </ProductsContextProvider>
    </BrowserRouter>
  );
}

export default App;
