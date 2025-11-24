import { useEffect, useState } from "react";
import RecipeBox from "../components/ui/recipeBox";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Recipe {
  id: number;
  title: string;
  image_url?: string | null;
  prep_time?: number | null;
  cook_time?: number | null;
  description?: string | null;
  difficulty: string;
  user: { name: string };
}

interface Link {
  first: string;
  last: string;
  prev: string;
  next: string;
}

function Home() {
  const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [links, setLinks] = useState<Link>();
  const [totalRecipes, setTotalRecipes] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${API}/v1/recipes`);
        if (!res.ok) throw new Error(`${res.status}`)
        const json = await res.json();
        setRecipes(json.data);
        setLinks(json.links);
        setTotalRecipes(json.meta.total);
        setLoading(false);
        console.log(json.data);
        console.log(json.links);
        console.log(json.meta.total);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecipes();
  }, [API]);

  const nextRecipes = async () => {
    if (!links?.next) return;
    try {
      const res = await fetch(links.next);
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json()
      setRecipes(json.data);
      setLinks(json.links);
    } catch (error) {
      console.log(error);
    } 
  }

  const prevRecipes = async () => {
    if (!links?.prev) return;
    try {
      const res = await fetch(links.prev);
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json()
      setRecipes(json.data);
      setLinks(json.links);
    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <main>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 py-6">
          <h2 className="text-5xl font-semibold font-playfair text-tertiary/90">All Recipes</h2>
          <p className="text-lg font-inter text-tertiary/90">{totalRecipes} total recipes</p>
        </div>
        <div className="flex gap-5 pr-10">
          <button
            type="button"
            onClick={() => prevRecipes()}
            className="bg-primary text-white text-4xl rounded-full hover:bg-primary/50"
          >
            <FaAngleLeft/>
          </button>
          <button
            type="button"
            onClick={() => nextRecipes()}
            className="bg-primary text-white text-4xl rounded-full hover:bg-primary/50"
          >
            <FaAngleRight/>
          </button>
        </div>
      </div>
      {loading ? (
        <p className="font-inter text-2xl text-tertiary/90">Loading Recipes</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((item, index) => (
            <RecipeBox
              key={item.id + index}
              recipe={item}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Home