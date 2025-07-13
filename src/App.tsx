import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import  Products  from "./pages/Products";
import Home from "./pages/Home";
import { Cart } from "./pages/Cart";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
