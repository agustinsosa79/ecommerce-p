import { useCart } from "../cart/useCart";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Producto {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface Props {
  producto: Producto;
}

const ProductCard = ({ producto }: Props) => {
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col text-green-950"
      >
        <div className="h-56 flex items-center justify-center bg-gradient-to-r from-green-200 via-gray-100 to-green-100">
          <img
            src={producto.images[0]}
            alt={producto.title}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow bg-green-950">
          <h2
            className="text-lg font-semibold truncate text-white"
            title={producto.title}
          >
            {producto.title}
          </h2>
          <p className="mt-2 text-xl font-bold text-green-100">
            ${producto.price.toFixed(2)}
          </p>

          <Link to={`/products/${producto.id}`} className="mt-2 text-sm text-green-100 hover:underline">
            Ver detalles
          </Link>


          <button
            className="mt-auto bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold py-2 rounded-md transition-colors shadow-md"
            type="button"
            onClick={() => addToCart(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductCard;
