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

  useEffect(() => {
    if (products) {
      setProducto(products);
    }
  }, [products]);

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
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
