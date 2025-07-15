import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../cart/useCart';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    brand: string;
    category: string;
    images: string[];
}


const ProductDetail = () => {
    const [ product, setProduct ] = useState<Product | null>(null);

    const { id } = useParams();
    const {addToCart} = useCart();

    useEffect(() => {

        fetch(`https://dummyjson.com/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
    }, [id]);
    

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-950 to-green-800 py-8 px-4">
  <div className="max-w-md mx-auto">
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-100">Detalle del Producto</h1>

    {product ? (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-64 object-contain bg-gray-200"
        />
        <div className="p-4 space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 border-t pt-3">
            <span><strong className="text-gray-700">Precio:</strong> ${product.price}</span>
            <span><strong className="text-gray-700">Stock:</strong> {product.stock}</span>
            <span><strong className="text-gray-700">Marca:</strong> {product.brand}</span>
            <span><strong className="text-gray-700">Categoría:</strong> {product.category}</span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-300">Cargando producto...</p>
    )}
  </div>
</div>


  );
}

export default ProductDetail