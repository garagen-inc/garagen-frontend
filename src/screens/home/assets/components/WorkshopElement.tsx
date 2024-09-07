import React from 'react'
import glass from '../img/magnifying-glass.svg'
import workshopimg from '../img/workshop.jpg'
import { WorkshopDTO } from '../../../../interfaces/workshop/workshop.dto'
import { useNavigate } from 'react-router-dom'

export const WorkshopElement = ({ workshop }: { workshop: WorkshopDTO }) => {
  const navigate = useNavigate()
  return (
    <div
      className="bg-slate-200 sm:w-full sm:mx-4 mx-4 lg:w-64  flex flex-col rounded-lg shadow-xl overflow-hidden cursor-pointer"
      onClick={() => navigate(`/workshop/${workshop.id}`)}
    >
      <img src={workshopimg} alt=""></img>
      <div className="flex justify-start flex-col">
        <span className="font-bold m-5 text-lg">{workshop.name}</span>
        {workshop.address?.city && (
          <span className="ml-5">{`${workshop.address?.city}, ${workshop.address?.street} ${workshop.address?.name}`}</span>
        )}
        <div className="flex justify-end">
          <button className="bg-gg-rich-black flex gap-3 flex-row text-gg-sunglow p-4 mt-5 mb-5 rounded-tl-lg rounded-bl-lg">
            Verificar horários <img src={glass} alt="" className="w-5"></img>
          </button>
        </div>
      </div>
    </div>
  )
}
