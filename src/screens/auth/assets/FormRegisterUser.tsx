import React, { useState } from "react";
import FormElement from "./components/FormElement";
import { handleFormSubmit, validateEmail } from "./functions/submitHandler";

export const FormRegisterUser: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [cpf, setCpf] = useState<string>("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
    surname: "",
    confirmPassword: "",
    cpf: "",
  });

  const mascaraCPF = (valor: string) => {
    valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita o tamanho a 11 dígitos
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o ponto
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o segundo ponto
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
    return valor;
  };

  // Atualiza o estado do valor do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (name === "cpf") {
      setCpf(mascaraCPF(value));
    }
  };

  // Função para lidar com o envio do formulário
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleFormSubmit(event, setError, formValues);
  };

  return (
    <>
      <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
        <span className="mb-3 text-4xl font-bold">É um prazer te conhecer</span>
        <span className="font-light text-gray-400 mb-8">
          Insira seus dados para continuar:
        </span>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-row gap-4">
            <FormElement
              isRequired={true}
              nameid="username"
              span="Nome"
              type="text"
              value={formValues.username}
              onChange={handleChange}
            />
            <FormElement
              isRequired={true}
              nameid="surname"
              span="Sobrenome"
              type="text"
              value={formValues.surname}
              onChange={handleChange}
            />
          </div>
          <FormElement
            isRequired={true}
            nameid="cpf"
            span="CPF (apenas números)"
            type="text"
            value={cpf}
            onChange={handleChange}
          />
          <FormElement
            isRequired={true}
            nameid="email"
            span="Email"
            type="text"
            value={formValues.email}
            onChange={handleChange}
          />
          <FormElement
            isRequired={true}
            nameid="password"
            span="Senha"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <FormElement
            isRequired={true}
            nameid="confirmPassword"
            span="Confirme sua senha"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
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

export default FormRegisterUser;
