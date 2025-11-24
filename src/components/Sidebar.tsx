import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo/Savorio-Logo.png";
import { FaHome, FaBook } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

function Sidebar() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("auth_token"));

  const protectedNavigate = (path: string) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/login", { state: { from: path } });
    }
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-80 bg-neutral-100 z-30 px-3 border-r border-tertiary/20 flex flex-col gap-5">
      <div className="flex items-center justify-center gap-2 h-24 border-b border-tertiary/20">
        <img src={logo} alt="Savorio logo" className="h-16" />
        <h1 className="font-playfair font-semibold text-4xl text-tertiary/90">Savorio</h1>
      </div>

      <nav className="flex flex-col gap-2 px-2">
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-primary/10">
          <FaHome />
          <span className="font-medium">Home</span>
        </Link>

        <button
          type="button"
          onClick={() => protectedNavigate("/dashboard/add-recipe")}
          className="flex items-center gap-3 px-3 py-2 rounded text-left hover:bg-primary/10"
        >
          <CiCirclePlus />
          <span className="font-medium">Add Recipe</span>
        </button>

        <button
          type="button"
          onClick={() => protectedNavigate("/dashboard/my-recipes")}
          className="flex items-center gap-3 px-3 py-2 rounded text-left hover:bg-primary/10"
        >
          <FaBook />
          <span className="font-medium">My Recipes</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;