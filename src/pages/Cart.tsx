import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Cart = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [productToRemove, setProductToRemove] = useState<number | null>(null);

  const { cart, removeToCart, clearCart, quantityRemove, addToCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gray-900 text-white rounded-lg shadow-md text-center max-w-lg mx-auto mt-10"
      >
        <h2 className="text-2xl font-bold">Tu carrito está vacío</h2>
        <p className="mt-4 text-gray-400">Agregá productos para verlos acá.</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gray-900 text-white rounded-xl shadow-lg space-y-6 max-w-5xl mx-auto mt-10"
      >
        <h2 className="text-3xl font-bold mb-4">🛒 Tu carrito</h2>

        <ul className="space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-4 rounded-xl shadow-md gap-4"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md border border-gray-700"
                />

                <div className="flex-1 w-full md:w-auto">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">Precio unitario: ${item.price}</p>
                  <p className="text-sm text-gray-400">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => quantityRemove(item.id)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                    onClick={() => item.quantity < 10 && addToCart(item)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
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

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4 gap-4">
          <p className="text-2xl font-bold text-white">Total: ${total.toFixed(2)}</p>
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
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            >
              <h3 className="text-xl font-semibold mb-4">¿Eliminar producto?</h3>
              <p className="mb-4">¿Deseás eliminar este producto del carrito?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
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

      {/* Modal: vaciar todo */}
      <AnimatePresence>
        {modalOpen2 && (
          <motion.div
            key="modal2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            >
              <h3 className="text-xl font-semibold mb-4">¿Vaciar carrito?</h3>
              <p className="mb-4">Esta acción eliminará todos los productos.</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen2(false)}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
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
    </>
  );
};
