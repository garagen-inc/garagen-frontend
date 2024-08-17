import React, { useState } from "react";
import UserForm from "./components/UserForm";
import CompanyForm from "./components/CompanyForm";
import { handleFormSubmit } from "./functions/submitHandler";
import maskCPF from "./functions/maskCPF";

export const FormRegisterUserWorkshop: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    // User
    email: "",
    password: "",
    username: "",
    surname: "",
    confirmPassword: "",
    cpf: "",

    // Company
    companyName: "",
    address: "",
    number: "",
    postalCode: "",
  });
  const [isUserForm, setIsUserForm] = useState(true); // State to control which form to show

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
  };

  const handleUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormSubmit(event, setError, formValues);
  };

  const handleContinue = () => {
    // Use `handleFormSubmit` to validate the form
    if (validateUserForm()) {
      setIsUserForm(false); // Switch to company form
    }
  };

  const validateUserForm = () => {
    // Use the existing handleFormSubmit function to validate the form
    const event = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;
    handleFormSubmit(event, setError, formValues);
    return !error; // Return true if no errors
  };

  const handleCompanySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleFormSubmit(event, setError, formValues, false); // Update `handleFormSubmit` to handle company form as needed
    if (!error) {
      console.log("Formulário de empresa enviado com sucesso!");
    }
  };

  const switchForm = () => {
    setIsUserForm((prev) => !prev);
    setError(null); // Clear errors when switching forms
  };

  return (
    <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
      <span className="mb-3 text-4xl font-bold">
        {isUserForm ? "É um prazer te conhecer" : "Informações da Empresa"}
      </span>
      <span className="font-light text-gray-400 mb-8">
        {isUserForm
          ? "Insira seus dados para continuar:"
          : "Insira os dados da empresa para continuar:"}
      </span>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {error}
        </div>
      )}
      {isUserForm ? (
        <UserForm
          formValues={formValues}
          onChange={handleChange}
          onSubmit={handleUserSubmit}
          error={error}
          showSubmitButton={false} // Hide default submit button
          onContinue={handleContinue} // Use the handleContinue function
        />
      ) : (
        <CompanyForm
          formValues={formValues}
          onChange={handleChange}
          onSubmit={handleCompanySubmit}
        />
      )}
      {!isUserForm && (
        <button
          type="button"
          onClick={switchForm}
          className="mt-4 w-full bg-gray-800 text-white p-2 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-600"
        >
          Registrar Usuário
        </button>
      )}
    </div>
  );
};

export default FormRegisterUserWorkshop;
