import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [productToRemove, setProductToRemove] = useState<number | null>(null);

  const { cart, removeToCart, clearCart, quantityRemove, addToCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-white px-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg shadow-md text-center max-w-lg bg-[#1a1a1a] border border-green-500"
        >
          <h2 className="text-2xl font-bold text-green-300">Tu carrito está vacío</h2>
          <p className="mt-4 text-green-100">Agregá productos para verlos acá.</p>
        </motion.div>

        <Link
          to="/productos"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition"
        >
          Volver a la tienda
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow bg-gradient-to-r from-gray-950 via-green-950 to-green-900 text-gray-100 min-h-screen py-10 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-[#0f0f0f] text-white rounded-xl min-h-screen shadow-lg space-y-6 max-w-5xl mx-auto mt-10 border border-green-700"
      >
        <h2 className="text-3xl font-bold mb-4 text-green-300">🛒 Tu carrito</h2>

        <ul className="space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col md:flex-row items-center justify-between bg-[#1a1a1a] p-4 rounded-xl border border-green-800 gap-4"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md border border-green-700"
                />

                <div className="flex-1 w-full md:w-auto">
                  <h3 className="text-lg font-semibold text-green-100">{item.title}</h3>
                  <p className="text-sm text-green-400">Precio unitario: ${item.price}</p>
                  <p className="text-sm text-green-400">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => quantityRemove(item.id)}
                    className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold text-green-200">{item.quantity}</span>
                  <button
                    onClick={() => item.quantity < 10 && addToCart(item)}
                    className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    setProductToRemove(item.id);
                    setModalOpen(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded self-start md:self-auto"
                >
                  Eliminar
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-green-800 pt-4 gap-4">
          <p className="text-2xl font-bold text-green-200">Total: ${total.toFixed(2)}</p>
          <button
            onClick={() => setModalOpen2(true)}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md text-white font-semibold"
          >
            Vaciar carrito
          </button>
        </div>
      </motion.div>

      {/* Modal: eliminar un producto */}
      <AnimatePresence>
        {modalOpen && productToRemove !== null && (
          <motion.div
            key="modal1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1a1a1a] text-white p-6 rounded-lg shadow-lg border border-green-700 max-w-sm w-full"
            >
              <h3 className="text-xl font-semibold mb-4 text-green-200">¿Eliminar producto?</h3>
              <p className="mb-4 text-green-400">¿Deseás eliminar este producto del carrito?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    removeToCart(productToRemove);
                    setProductToRemove(null);
                    setModalOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: vaciar carrito */}
      <AnimatePresence>
        {modalOpen2 && (
          <motion.div
            key="modal2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1a1a1a] text-white p-6 rounded-lg shadow-lg border border-green-700 max-w-sm w-full"
            >
              <h3 className="text-xl font-semibold mb-4 text-green-200">¿Vaciar carrito?</h3>
              <p className="mb-4 text-green-400">Esta acción eliminará todos los productos.</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen2(false)}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    setModalOpen2(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Vaciar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
