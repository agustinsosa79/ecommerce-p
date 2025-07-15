import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { AnimatePresence, motion } from "framer-motion";

interface Producto {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface Props {
  products?: Producto[];
}

export const ProductList = ({products}: Props) => {
  const [producto, setProducto] = useState<Producto[]>([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (products) {
      setProducto(products);
    }
  }, [products]);

  const mostrarMensaje = () => {
    if(message) return
    setMessage(true)
    setTimeout(() => {
      setMessage(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4"
      >
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {producto.map((p) => (
            <ProductCard key={p.id} producto={p} onAdd={mostrarMensaje} />
          ))}
        </div>
      </motion.div>


      {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg z-50"
          >
            Producto añadido al carrito 🛒
          </motion.div>
        )}
    </AnimatePresence>
  );
};
