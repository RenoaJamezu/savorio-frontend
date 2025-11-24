import { FaArrowLeft } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { LuChefHat } from "react-icons/lu";
import logo from "../assets/images/logo/Savorio-Logo.png"

function Recipe() {
  return (
    <main>
      <button
        className="group flex items-center gap-3 font-inter text-xl rounded-xl px-3 py-3 transition-colors duration-150 hover:bg-primary focus:outline-none"
      >
        <FaArrowLeft className="text-tertiary/90 group-hover:text-white transition-colors duration-150" />
        <span className="text-tertiary/90 group-hover:text-white transition-colors duration-150">
          Back to recipes
        </span>
      </button>
      <div className="flex flex-row gap-10">
        <img
          src={logo}
          alt=""
          className="w-full rounded-2xl"
        />
        <div className="w-full my-10">
          <div className="flex flex-col">
            <h2 className="text-5xl font-playfair font-semibold text-tertiary">Title</h2>
            <h5 className="text-2xl font-inter font-medium text-tertiary/90">Name</h5>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-3">
              <IoMdTime className="text-2xl text-primary"/>
              <div className="flex flex-col">
                <p className="text-tertiary/90">Prep Time</p>
                <p className="font-bold text-tertiary">time min</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IoMdTime className="text-2xl text-primary"/>
              <div className="flex flex-col">
                <p className="text-tertiary/90">Cook Time</p>
                <p className="font-bold text-tertiary">time min</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LuChefHat className="text-2xl text-primary"/>
              <div className="flex flex-col">
                <p className="text-tertiary/90">Difficulty</p>
                <p className="font-bold text-tertiary">hard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Recipe