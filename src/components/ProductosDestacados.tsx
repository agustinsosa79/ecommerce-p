import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../cart/useCart";

interface Producto {
    id: number;
    title: string;
    price: number;
    images: string[];
    rating?: number;
    discountPercentage?: number;
}

const ProductCard = ({ producto, onAddToCart }: { producto: Producto; onAddToCart: (p: Producto) => void }) => (
    <motion.div
        className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden hover:shadow-2xl transition-shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
    >
        <div className="relative">
            <img
                src={producto.images[0]}
                alt={producto.title}
                className="w-full h-48 object-cover"
            />
            {producto.discountPercentage && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                    -{producto.discountPercentage}%
                </span>
            )}
        </div>
        <div className="flex-1 flex flex-col p-4">
            <h3 className="text-lg font-semibold mb-1 text-gray-800">{producto.title}</h3>
            <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
                <span className="text-gray-700 font-medium">{producto.rating}</span>
            </div>
            <div className="text-green-700 font-bold text-xl mb-4">${producto.price}</div>
            <button
                className="mt-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-colors"
                type="button"
                onClick={() => onAddToCart(producto)}
            >
                Agregar al carrito
            </button>
        </div>
    </motion.div>
);

const ProductosDestacados = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=10")
            .then(res => res.json())
            .then(data => {
                const filteredProducts: Producto[] = data.products.filter(
                    (product: Producto) => product.rating && product.rating > 2 && product.discountPercentage && product.discountPercentage > 5
                );
                setProductos(filteredProducts);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {loading ? (
                <p className="text-center text-gray-500">Cargando...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {productos.map(producto => (
                            <ProductCard key={producto.id} producto={producto} onAddToCart={addToCart} />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default ProductosDestacados;