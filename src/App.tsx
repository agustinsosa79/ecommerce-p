import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import  Products  from "./pages/Products";
import Home from "./pages/Home";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
