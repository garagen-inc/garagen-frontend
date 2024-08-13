import React from "react";

export const FormLogin: React.FC = () => {
  return (
    <>
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
    </>
  );
};
