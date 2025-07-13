import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../cart/useCart';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
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
    
    console.log(product?.images);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-950 to-green-800 py-12 px-4">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">Detalle del Producto</h1>

    {product ? (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-96 object-contain"
        />
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-xl font-bold text-green-600">${product.price}</span>
            <span className="text-sm px-3 py-1 bg-gray-200 rounded-full text-gray-700">{product.category}</span>
          </div>
          <button onClick={() => addToCart(product)} className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition duration-300">
            Añadir al carrito
          </button>
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-500">Cargando producto...</p>
    )}
  </div>
</div>

  );
}

export default ProductDetail