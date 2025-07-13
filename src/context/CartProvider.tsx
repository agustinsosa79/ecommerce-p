import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { type Producto,  type CartContextType, type ProductQuantity } from "../types/types";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProductQuantity[]>(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (error) {
        console.error("Error al parsear el carrito desde localStorage:", error);
      }
    }
    return [];
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error al parsear el carrito desde localStorage:", error);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto: Producto) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === producto.id);
      if (exists) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
  };

  const removeToCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const quantityRemove = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const clearCart = () => setCart([]);

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeToCart,
    clearCart,
    quantityRemove,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
