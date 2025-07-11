import FilterOfCategory from "../components/FilterOfCategory";
import { ProductList } from "../components/ProductList";
import { useEffect, useState } from "react";

interface Productos {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const Products = () => {
  const [categoryProducts, setCategoryProducts] = useState<Productos[]>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const url = selectedCategory
      ? `https://dummyjson.com/products/category/${selectedCategory}`
      : "https://dummyjson.com/products?limit=59";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data.products || []);
        setLoading(false);
      });
  }, [selectedCategory]);

  // Aplicar estilización similar a Navbar
  const categoryProductsFiltered = Array.isArray(categoryProducts)
    ? categoryProducts.filter((p) =>
        p.title.toLowerCase().includes(busqueda.toLowerCase())
      )
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-950 via-gray-900  to-gray-950 text-gray-100 py-10 px-4 sm:px-8">
      <header className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
          Todos los productos
        </h1>
        <p className="mt-2 text-green-200 max-w-lg">
          Explora nuestra selección exclusiva de productos con la mejor calidad y diseño.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        <aside className="md:w-64 w-full rounded-2xl bg-gray-900 backdrop-blur-md p-6 flex flex-col gap-6 shadow-2xl ">
          <h3 className="text-lg font-semibold text-green-200">Filtrar productos</h3>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-green-400 shadow focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <FilterOfCategory onCategoryChange={setSelectedCategory} />
        </aside>

        <section className="flex-1">
          {loading ? (
            <div className="text-center text-green-200 py-20">Cargando productos...</div>
          ) : (
            <ProductList products={categoryProductsFiltered} />
          )}
        </section>
      </div>
      </main>
    );
  };
  
  export default Products;
