import FilterOfCategory from "../components/FilterOfCategory";
import { ProductList } from "../components/ProductList";
import { useEffect, useState } from "react";

interface Productos {
  id: number;
  title: string;
  price: number;
  images: string[];
  discountPercentage?: number;
  rating?: number;
}

const Products = () => {
  const [categoryProducts, setCategoryProducts] = useState<Productos[]>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState<string>("");
  const [filtroRating, setFiltroRating] = useState<string>("");

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

  const precioNumber = Number(filtroPrecio);
  const ratingNumber = Number(filtroRating);

  const categoryProductsFiltered = Array.isArray(categoryProducts)
    ? categoryProducts
        .filter((p) =>
          p.title.toLowerCase().includes(busqueda.toLowerCase())
        )
        .filter((p) =>
          filtroPrecio && !isNaN(precioNumber) && precioNumber > 0
            ? p.price <= precioNumber
            : true
        )
        .filter((p) =>
          filtroRating && !isNaN(ratingNumber) && ratingNumber > 0
            ? (p.rating ?? 0) >= ratingNumber
            : true
        )
    : [];

  // Función para limpiar ceros a la izquierda y evitar NaN
  const handleNumberInput = (
    value: string,
    setValue: (v: string) => void,
    allowDecimal = false
  ) => {
    // Eliminar espacios y ceros a la izquierda
    let cleaned = value.replace(/^0+(?!\.)/, "");
    // Solo permitir números y punto decimal si corresponde
    cleaned = allowDecimal
      ? cleaned.replace(/[^0-9.]/g, "")
      : cleaned.replace(/[^0-9]/g, "");
    // Evitar más de un punto decimal
    if (allowDecimal) {
      const parts = cleaned.split(".");
      if (parts.length > 2) cleaned = parts[0] + "." + parts[1];
    }
    setValue(cleaned);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-100 py-10 px-4 sm:px-8">
      <header className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
          Todos los productos
        </h1>
        <p className="mt-2 text-green-200 max-w-lg">
          Explora nuestra selección exclusiva de productos con la mejor calidad y diseño.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        <aside className="md:w-64 w-full rounded-2xl bg-gray-900 backdrop-blur-md p-6 flex flex-col gap-6 shadow-2xl">
          <h3 className="text-lg font-semibold text-green-200">Filtrar productos</h3>

          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-green-400 shadow focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          {/* Filtro de categoría */}
          <FilterOfCategory onCategoryChange={setSelectedCategory} />

          {/* Filtro de precio máximo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-green-200">Precio máximo</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[1-9][0-9]*"
              value={filtroPrecio}
              onChange={(e) => handleNumberInput(e.target.value, setFiltroPrecio)}
              className="p-2 rounded bg-white text-gray-800 border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition no-spinner"
              placeholder="Ej: 500"
              autoComplete="off"
            />
          </div>

          {/* Filtro de rating mínimo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-green-200">Rating mínimo</label>
            <input
              type="text"
              inputMode="decimal"
              pattern="^[1-5](\.[0-9]{0,2})?$"
              value={filtroRating}
              onChange={(e) => handleNumberInput(e.target.value, setFiltroRating, true)}
              className="p-2 rounded bg-white text-gray-800 border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition no-spinner"
              placeholder="Ej: 4.5"
              autoComplete="off"
            />
          </div>
        </aside>

        <section className="flex-1">
          {loading ? (
            <div className="text-center text-green-200 py-20">Cargando productos...</div>
          ) : (
            <ProductList products={categoryProductsFiltered} />
          )}
        </section>
      </div>
      {/* Quitar flechas de los inputs numéricos */}
      <style>
        {`
          input[type="number"], input.no-spinner {
            -moz-appearance: textfield;
          }
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button,
          input.no-spinner::-webkit-outer-spin-button,
          input.no-spinner::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}
      </style>
    </main>
  );
};

export default Products;
