import React, { useState } from "react";
import Navbar from "../shared_components/Navbar";
import glass from "./assets/img/magnifying-glass.svg";
import "./assets/home.css";
import workshop from "./assets/img/workshop.jpg";
export function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Navbar />
      <div className="bg-gg-lavender-blush">
        <div className="flex m-10 justify-center font-bold items-center flex-col">
          <span className="text-6xl p-6 text-gg-rich-black">
            Placeholder Placeholder
          </span>
          <span className="text-xl text-gg-rich-black">
            placeholder placeholder placeholder placeholder placeholder
            placeholder placeholder
          </span>
          <div
            className={`search-bar-container m-5 flex ${
              isHovered ? "hovered" : "default"
            } sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-full overflow-hidden transition-transform duration-300 ease-in-out`}
          >
            <button
              className="p-2 text-white w-1/6 m-2 border-b-gg-robin-egg-blue"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img src={glass} className="w-8 h-8" alt="Magnifying Glass" />
            </button>
            <input
              type="text"
              placeholder="Placeholder placeholder"
              className={`search-bar-container m-5 flex ${
                isHovered ? "hovered" : "default"
              } outline-none placeholder-gray-800 p-1 w-5/6 transition-transform duration-300 ease-in-out`}
            />
          </div>
        </div>

        <div className="justify-center align-middle flex">
          <div className="bg-slate-200 m-10 sm:w-1/2 md:w-1/3 flex flex-col rounded-lg shadow-xl overflow-hidden ">
            <img src={workshop} alt=""></img>
            <div className="flex justify-start flex-col">
              <span className="font-bold m-5 text-lg">Lugar</span>
              <span className="ml-5">Descrição</span>
              <div className="flex justify-end">
                <button className="bg-gg-rich-black flex gap-3 flex-row text-gg-sunglow p-4 mt-5 mb-5 rounded-tl-lg rounded-bl-lg">
                  Verificar horários{" "}
                  <img src={glass} alt="" className="w-5"></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
