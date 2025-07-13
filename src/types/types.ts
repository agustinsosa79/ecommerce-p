export interface Producto {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface ProductQuantity extends Producto {
  quantity: number;
}

export interface CartContextType {
  cart: ProductQuantity[];
  addToCart: (producto: Producto) => void;
  removeToCart: (id: number) => void;
  clearCart: () => void;
  quantityRemove: (id: number) => void;
}
