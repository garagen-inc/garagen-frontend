import React from "react";
import glass from "../img/magnifying-glass.svg";
import workshop from "../img/workshop.jpg";

interface WorkshopElementProps {
  workshop_image?: string;
  workshop_name?: string;
  workshop_desc?: string;
}

export const WorkshopElement: React.FC<WorkshopElementProps> = ({
  workshop_image = "Placeholder Image URL",
  workshop_name = "Placeholder Name",
  workshop_desc = "Placeholder Description",
}) => {
  return (
    <div className="bg-slate-200 m-10 sm:w-5/6 md:w-1/2 lg:w-1/3 flex flex-col rounded-lg shadow-xl overflow-hidden ">
      <img src={workshop} alt=""></img>
      <div className="flex justify-start flex-col">
        <span className="font-bold m-5 text-lg">Lugar</span>
        <span className="ml-5">Descrição</span>
        <div className="flex justify-end">
          <button className="bg-gg-rich-black flex gap-3 flex-row text-gg-sunglow p-4 mt-5 mb-5 rounded-tl-lg rounded-bl-lg">
            Verificar horários <img src={glass} alt="" className="w-5"></img>
          </button>
        </div>
      </div>
    </div>
  );
};
