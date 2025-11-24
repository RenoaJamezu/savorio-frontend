import logo from "../../assets/images/logo/Savorio-Logo.png"
import { IoMdTime } from "react-icons/io";
import { LuChefHat } from "react-icons/lu";

type RecipeItems = {
  id: number;
  title: string;
  image_url?: string | null;
  prep_time?: number | null;
  cook_time?: number | null;
  description?: string | null;
  difficulty: string;
  user: { name: string };
};

const RecipeBox = ({ recipe }: { recipe: RecipeItems }) => {
  const totalTime = (recipe.prep_time ?? 0) + (recipe.cook_time ?? 0);
  const img = recipe.image_url || logo;
  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <img
        src={img}
        alt={recipe.title}
        className="w-full h-60 object-cover"
      />
      <div className="flex flex-col p-5">
        <h3 className="font-playfair font-semibold text-2xl text-tertiary/90 line-clamp-1">{recipe.title}</h3>
        <div className="flex items-center font-inter text-tertiary/90 text-lg gap-5 mt-2">
          <div className="flex items-center gap-2">
            <div><IoMdTime /></div>
            <p>{totalTime} min</p>
          </div>
          <div className="flex items-center gap-2">
            <div><LuChefHat /></div>
            <p>{recipe.difficulty}</p>
          </div>
        </div>
        <p className="font-inter text-tertiary/90 text-lg mt-5">{recipe.user.name}</p>
      </div>
    </article>
  )
}

export default RecipeBox