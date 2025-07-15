import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/cart", label: "Carrito" },
];

const Navbar = () => {
  return (
    <header className="relative bg-gradient-to-r from-gray-950 via-green-950 to-green-900 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)] top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center gap-3 text-4xl font-extrabold tracking-tight bg-gradient-to-r from-green-900 via-gray-200 to-green-100 bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <svg
        className="w-10 h-10 text-green-900"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        >
        <circle cx="24" cy="24" r="22" strokeWidth="4" />
        <path
          d="M16 32l8-16 8 16"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        </svg>
        ShopTime
      </Link>

      {/* Navigation */}
      <ul className="flex items-center gap-2 sm:gap-6 md:gap-10 text-lg font-semibold">
        {NAV_LINKS.map(({ to, label }) => (
        <li key={to}>
          <NavLink
          to={to}
          className={({ isActive }) =>
            [
            "px-4 py-2 rounded-lg transition-all duration-200",
            isActive
              ? "bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg scale-105"
              : "text-green-200 hover:bg-green-800/80 hover:text-white hover:scale-105",
            ].join(" ")
          }
          >
          {label}
          </NavLink>
        </li>
        ))}
      </ul>
      </nav>
    </header>
  );
};

export default Navbar;
