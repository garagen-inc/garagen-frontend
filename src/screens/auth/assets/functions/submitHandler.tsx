import { ChangeEvent } from "react";
import validateCPF from "./validatorCPF";

interface FormValues {
  email: string;
  password: string;
  username: string;
  surname: string;
  confirmPassword: string;
  cpf: string;
}

export const handleFormSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  formValues: FormValues
) => {
  event.preventDefault();

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
  console.log("Formulário enviado com sucesso!");
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
