import React, { useState } from 'react'
import { WorkshopElement } from './assets/components/WorkshopElement'
import Navbar from '../shared_components/Navbar'
import glass from './assets/img/magnifying-glass.svg'
import './assets/home.css'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../constants/enums'
import { GaragerApi } from '../../services/api'

export function Home() {
  const [isHovered, setIsHovered] = useState(false)

  const { data, isLoading } = useQuery({
    initialData: undefined,
    queryKey: [QueryKeys.LIST_WORKSHOPS],
    queryFn: async () => {
      return await GaragerApi.listWorkshops()
    },
  })

  return (
    <>
      <Navbar />
      <div className="bg-gg-lavender-blush">
        <div className="flex my-10  justify-center font-bold items-center flex-col">
          {/* <span className="text-6xl p-6 text-gg-rich-black">
            Busque por oficinal
          </span> */}
          <span className="text-xl text-gg-rich-black">
            Busque por oficinas perto de você!
          </span>
          <div className="w-full px-4 flex justify-center align-middle items-center">
            <div
              className={`search-bar-container mt-4 flex ${
                isHovered ? 'hovered' : 'default'
              } sm:w-full w-[512px] lg:w-[512px] rounded-md overflow-hidden transition-transform duration-300 ease-in-out`}
            >
              <button
                className="p-2 text-white w-1/6 m-2 border-b-gg-robin-egg-blue"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img src={glass} className="w-6 h-6" alt="Magnifying Glass" />
              </button>
              <input
                type="text"
                placeholder="Oficina do Thomas"
                className={`search-bar-container flex ${
                  isHovered ? 'hovered' : 'default'
                } outline-none placeholder-gray-500 p-1 w-5/6 transition-transform duration-300 ease-in-out font-normal`}
              />
            </div>
          </div>
        </div>
        <div className="justify-center w-full align-middle flex flex-row flex-wrap gap-4">
          {isLoading && <h1>Buscando Oficinas...</h1>}
          {data &&
            data.map((workshop) => (
              <WorkshopElement workshop={workshop} key={workshop.id} />
            ))}
        </div>
      </div>
    </>
  )
}
