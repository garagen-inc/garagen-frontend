import React from "react";
import { useState } from "react";

export const FormRegisterGarage: React.FC = () => {
  // State para armazenar a mensagem de erro
  const [error, setError] = useState<string | null>(null);

  // Função para validar o e-mail
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Impede o comportamento padrão do navegador de enviar o formulário e recarregar a página
    event.preventDefault();

    // Obtém o formulário que disparou o evento
    const form = event.currentTarget;

    // Obtém os valores dos campos de entrada do formulário
    const email = form.email.value;
    const password = form.password.value;
    const username = form.username;
    const surname = form.surname.value;

    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    if (!password) {
      setError("Por favor, insira sua senha.");
      return;
    }

    if (!username || !surname) {
      setError("Por favor, insira seu nome completo.");
      return;
    }

    setError(null);

    //TODO envio do formulário.
    console.log("Formulário enviado com sucesso!");
  };
  return (
    <>
      <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
        <span className="mb-3 text-4xl font-bold">
          É um prazer fazermos negócios
        </span>
        <span className="font-light text-gray-400 mb-8">
          Insira seus dados para continuar:
        </span>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4">
            <div className="py-1">
              <span className="mb-2 text-md">Nome</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="username"
                id="username"
                required
              />
            </div>
            <div className="py-1">
              <span className="mb-2 text-md">Sobrenome</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="surname"
                id="surname"
                required
              />
            </div>
          </div>
          <div className="py-1">
            <span className="mb-2 text-md">CPF</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="cpf"
              id="cpf"
              required
            />
          </div>
          <div className="py-1">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              name="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
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
            Registrar
          </button>
        </form>
      </div>
    </>
  );
};

export default FormRegisterGarage;
