import React from "react";
import FormElement from "./FormElement";

interface UserFormProps {
  formValues: {
    email: string;
    password: string;
    username: string;
    surname: string;
    confirmPassword: string;
    cpf: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  showSubmitButton?: boolean;
  onContinue?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  formValues,
  onChange,
  onSubmit,
  error,
  showSubmitButton = true,
  onContinue,
}) => {
  // Adicionando logs para depuração
  console.log("UserForm Props:", { formValues, error, showSubmitButton });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {error}
        </div>
      )}
      <div className="flex flex-row gap-4">
        <FormElement
          isRequired={true}
          nameid="username"
          span="Nome"
          type="text"
          value={formValues.username}
          onChange={onChange}
        />
        <FormElement
          isRequired={true}
          nameid="surname"
          span="Sobrenome"
          type="text"
          value={formValues.surname}
          onChange={onChange}
        />
      </div>
      <FormElement
        isRequired={true}
        nameid="cpf"
        span="CPF (apenas números)"
        type="text"
        value={formValues.cpf}
        onChange={onChange}
      />
      <FormElement
        isRequired={true}
        nameid="email"
        span="Email"
        type="text"
        value={formValues.email}
        onChange={onChange}
      />
      <FormElement
        isRequired={true}
        nameid="password"
        span="Senha"
        type="password"
        value={formValues.password}
        onChange={onChange}
      />
      <FormElement
        isRequired={true}
        nameid="confirmPassword"
        span="Confirme sua senha"
        type="password"
        value={formValues.confirmPassword}
        onChange={onChange}
      />
      <FormElement
        isRequired={true}
        nameid="phone"
        span="Número de telefone"
        type="text"
        value={formValues.phone}
        onChange={onChange}
      />
      {showSubmitButton && (
        <button
          type="submit"
          className="w-full bg-gg-rich-black text-white p-2 rounded-lg mb-6 transition-colors duration-200 ease-in-out hover:bg-gg-lavender-blush hover:text-black hover:border hover:border-gray-300"
        >
          Registrar
        </button>
      )}
      {!showSubmitButton && onContinue && (
        <button
          type="button"
          onClick={onContinue}
          className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 transition-colors duration-200 ease-in-out hover:bg-blue-600"
        >
          Continuar
        </button>
      )}
    </form>
  );
};

export default UserForm;
