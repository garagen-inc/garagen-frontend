import { ChangeEvent } from "react";
import validateCPF from "./validatorCPF";

interface FormValues {
  email: string;
  password: string;
  username: string;
  surname: string;
  confirmPassword: string;
  cpf: string;
  companyName?: string; // Adicione campos opcionais para o formulário de empresa
  address?: string;
  number?: string;
  postalCode?: string;
}

export const handleFormSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  formValues: FormValues,
  isUserForm: boolean = true // Adicione um parâmetro para distinguir entre os formulários
) => {
  event.preventDefault();

  if (isUserForm) {
    const { email, password, username, surname, confirmPassword, cpf } =
      formValues;

    if (!username || !surname) {
      setError("Por favor, insira seu nome completo.");
      return;
    }

    if (!validateCPF(cpf)) {
      setError("CPF inválido.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    if (!password) {
      setError("Por favor, insira sua senha.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Senhas não coincidem.");
      return;
    }

    setError(null);
    console.log("Formulário de usuário enviado com sucesso!");
  } else {
    // Validação para o formulário de empresa (caso haja)
    const { companyName, address, number, postalCode } = formValues;

    if (!companyName || !address || !number || !postalCode) {
      setError("Por favor, preencha todos os campos da empresa.");
      return;
    }

    setError(null);
    console.log("Formulário de empresa enviado com sucesso!");
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
