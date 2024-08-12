import React from "react";
import UserIcon from "../shared_components/shared_assets/user.svg";
import GarageIcon from "../shared_components/shared_assets/garage.svg";

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gg-rich-black overf">
      <div className="absolute overflow-hidden h-screen w-screen justify-items-start items-center">
        <div className="circle "></div>
      </div>

      <div className="relative flex flex-col md:flex-row w-full max-w-6xl m-6 bg-gg-lavender-blush shadow-2xl rounded-3xl overflow-hidden">
        <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
          <span className="mb-3 text-4xl font-bold">Bem-vindo de volta</span>
          <span className="font-light text-gray-400 mb-8">
            Insira seus dados para continuar:
          </span>
          <form className="space-y-4">
            <div className="py-1">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="py-1">
              <span className="mb-2 text-md">Senha</span>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gg-rich-black text-white p-2 rounded-lg mb-6 transition-colors duration-200 ease-in-out hover:bg-gg-lavender-blush hover:text-black hover:border hover:border-gray-300"
            >
              Entrar
            </button>
          </form>
        </div>

        <div className="relative w-full md:w-1/2 flex items-center p-12 justify-center inset-0 bg-gradient-to-b from-gg-robin-egg-blue to-gg-sunglow">
          <div className="">
            <span className="text-4xl font-bold text-gg-lavender-blush">
              Primeira vez aqui?
            </span>
            <div className="flex items-center justify-center p-12 space-x-6">
              <button className="flex flex-col items-center justify-center w-32 h-32 bg-gg-lavender-blush text-gg-rich-black rounded-lg shadow-lg transition-colors duration-200 ease-in-out hover:bg-gg-sunglow focus:outline-none focus:ring-2 focus:ring-blue-400">
                <img
                  src={UserIcon}
                  alt="user"
                  className="w-1/3 h-1/3 object-contain"
                />
                <span className="mt-2 text-sm text-center">
                  Cadastrar conta convencional
                </span>
              </button>
              <button className="flex flex-col items-center justify-center w-32 h-32 bg-gg-lavender-blush text-gg-rich-black rounded-lg shadow-lg transition-colors duration-200 ease-in-out hover:bg-gg-cinnabar focus:outline-none focus:ring-2 focus:ring-blue-400">
                <img
                  src={GarageIcon}
                  alt="garage"
                  className="w-1/3 h-1/3 object-contain"
                />
                <span className="mt-2 text-sm text-center">
                  Cadastrar conta comercial
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
