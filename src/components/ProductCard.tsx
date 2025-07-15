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
  onAdd: () => void;
}

const ProductCard = ({ producto, onAdd }: Props) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(producto);
    onAdd();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col text-green-950"
      >
        <div className="h-56 flex items-center justify-center">
          <img
            src={producto.images[0]}
            alt={producto.title}
            className="h-full w-full object-contain bg-gradient-to-t from-gray-500 via-gray-400 to-gray-300"
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

          <div className="flex-1 flex items-end gap-3">
            <Link
                to={`/products/${producto.id}`}
                className="inline-block mt-2 text-center text-sm font-medium text-white bg-blue-600 px-4 m-1 p-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
            Ver detalles
            </Link>

            <button
                className="mt-auto text-sm bg-green-600 hover:bg-green-700 text-white font-semibold m-1 p-3 rounded transition-colors"
                type="button"
                onClick={handleAddToCart}
                >
                Agregar al carrito
            </button>
                </div>
        </div>
            
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductCard;
