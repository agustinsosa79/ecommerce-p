import { Link } from "react-router-dom";
import ProductosDestacados from "../components/ProductosDestacados";



const Home = () => {


  return (
    <div className="bg-gradient-to-r from-gray-950 via-green-950 to-green-900 min-h-screen text-gray-100">
      <section className="hero py-20 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-green-900 via-gray-200 to-green-100 bg-clip-text text-transparent drop-shadow-lg">
          Bienvenido a Nuestra Tienda
        </h2>
        <p className="mt-4 text-xl text-green-100">Descubre productos únicos y de calidad</p>
        <Link
          to="/productos"
          className="mt-6 inline-block px-6 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg scale-100 hover:scale-105"
        >
          Explorar Productos
        </Link>
      </section>

      <section className="productos py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-green-900 via-gray-200 to-green-100 bg-clip-text text-transparent mb-10 drop-shadow-lg">
            Productos Destacados
          </h3>
           <ProductosDestacados />
        </div>
      </section>
    </div>
  );
};

export default Home;