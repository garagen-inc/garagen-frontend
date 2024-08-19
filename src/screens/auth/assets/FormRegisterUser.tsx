import React, { useState } from "react";
import UserForm from "./components/UserForm";
import { handleFormSubmit } from "./functions/handleFormSubmit";
import { maskCPF, maskPhoneNumber } from "./functions/masks";

export const FormRegisterUser: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
    surname: "",
    confirmPassword: "",
    cpf: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (name === "cpf") {
      setFormValues((prevValues) => ({
        ...prevValues,
        cpf: maskCPF(value),
      }));
    }
    if (name === "phone") {
      setFormValues((prevValues) => ({
        ...prevValues,
        phone: maskPhoneNumber(value),
      }));
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleFormSubmit(event, setError, formValues);
  };

  return (
    <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
      <span className="mb-3 text-4xl font-bold">É um prazer te conhecer</span>
      <span className="font-light text-gray-400 mb-8">
        Insira seus dados para continuar:
      </span>
      <UserForm
        formValues={formValues}
        onChange={handleChange}
        onSubmit={onSubmit}
        error={error} // Passe a mensagem de erro
      />
    </div>
  );
};

export default FormRegisterUser;
