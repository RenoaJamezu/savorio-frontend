import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-80 right-0 h-24 z-40 transition-colors duration-200 backdrop-blur-xs border-b border-tertiary/20"
    >
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center gap-4">

        {/* centered search like your pasted image */}
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex-1 max-w-lg">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-tertiary/60">
              <FiSearch />
            </span>
            <input
              id="nav-search"
              type="search"
              placeholder="Search recipes..."
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-primary/10 bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </form>
      </div>
    </header>
  );
}