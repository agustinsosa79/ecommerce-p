import { useEffect, useState } from "react";


interface Category {
    name: string,
    slug: string
}

interface Props {
  onCategoryChange: (slug: string) => void;
}

const FilterOfCategory = ({ onCategoryChange }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
      console.log("Categorías recibidas:", data);        
        setCategories(data)});
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="text-sm text-indigo-300 font-medium">
        Categoría
      </label>
      <select
        id="category"
        onChange={(e) => onCategoryChange(e.target.value)}
        className="bg-indigo-950 text-white p-3 rounded-lg border border-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOfCategory;
