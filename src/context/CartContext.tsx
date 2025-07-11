import { createContext, useContext, useState, type ReactNode } from "react";
/* eslint-disable react-refresh/only-export-components */




interface Producto {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface ProductQuantity extends Producto {
    quantity: number
}


interface CartContextType {
    cart: ProductQuantity[];
    addToCart:(producto: Producto) => void;
    removeToCart:(id: number) => void;
    clearCart:() => void;
    quantityRemove:(id: number) => void;
}


const CartContext = createContext<CartContextType | undefined>(undefined)


export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<ProductQuantity[]>([])

    const addToCart = (producto: Producto) => {
        const productoExiste = cart.find(p => p.id === producto.id)

        if (productoExiste) {
            setCart(cart.map(p => p.id === producto.id ? {...p, quantity: p.quantity + 1}: p))
            
        }else {
            setCart([...cart, {...producto, quantity: 1}])
        }
    }

    const removeToCart = (id: number) => {
        const producto = cart.find(p => p.id === id)

        if(!producto) return
        if (producto) {
            setCart(cart.filter(p => p.id !== id))
        } 
        
    }

    const quantityRemove = (id: number) => {
        const producto = cart.find(p => p.id === id)
        if (producto && producto.quantity > 1) {
            setCart(cart.map(p => p.id === id ? {...p, quantity: p.quantity - 1} : p))
        }
    }

    const clearCart = () => {
        setCart([])
    }

    return(
        <CartContext.Provider value={{cart,addToCart,removeToCart,clearCart, quantityRemove}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {  
    const context = useContext(CartContext)
    if (!context) throw new Error('Necesita usar el contexto del carrito')
        return context
}