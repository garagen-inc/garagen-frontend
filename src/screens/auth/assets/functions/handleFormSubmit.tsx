import validateCPF from "./validatorCPF";
import axios from "axios";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const api = axios.create({
  baseURL: "https://api.example.com", // Base URL padrão
});

interface UserValues {
  name: string;
  password: string;
  phone: string;
  cpf: string;
  email: string;
}

interface FormValues {
  email: string;
  password: string;
  username: string;
  surname: string;
  confirmPassword: string;
  cpf: string;
  phone: string;

  companyName?: string;
  address?: string;
  number?: string;
  postalCode?: string;
}

export const handleFormSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  formValues: FormValues,
  isUserForm: boolean = true,
  awaitRegisterCompany: boolean = false,
  baseURL: string // Adiciona o parâmetro baseURL
): Promise<string | null> => {
  // Modificado para retornar o erro
  event.preventDefault();

  if (isUserForm) {
    const { email, password, username, surname, confirmPassword, cpf, phone } =
      formValues;

    if (!username || !surname) {
      return "Por favor, insira seu nome completo.";
    }

    if (!validateCPF(cpf)) {
      return "CPF inválido.";
    }

    if (!phone) {
      return "Por favor, insira seu telefone.";
    }

    if (!validateEmail(email)) {
      return "Por favor, insira um e-mail válido.";
    }

    if (!password) {
      return "Por favor, insira sua senha.";
    }

    if (password !== confirmPassword) {
      return "Senhas não coincidem.";
    }

    if (awaitRegisterCompany === false) {
      // Cria o objeto no formato esperado por postUser
      const userData: UserValues = {
        name: `${username} ${surname}`, // Nome completo no formato esperado
        password,
        phone,
        cpf,
        email,
      };

      try {
        await postUser(userData, baseURL); // Envia o formulário do usuário
        console.log("Usuário registrado com sucesso!");
        return null;
      } catch (error) {
        return "Erro ao registrar o usuário.";
      }
    } else {
      return null;
    }
  } else {
    const {
      companyName,
      address,
      number,
      postalCode,
      email,
      password,
      username,
      surname,
      confirmPassword,
      cpf,
      phone,
    } = formValues;

    if (!companyName || !address || !number || !postalCode) {
      return "Por favor, preencha todos os campos da empresa.";
    }

    try {
      await postUserCompany(
        {
          email,
          password,
          username,
          surname,
          confirmPassword,
          cpf,
          phone,
          companyName,
          address,
          number,
          postalCode,
        },
        baseURL
      );
      console.log(formValues);
      return null;
    } catch (error) {
      return "Erro ao registrar a empresa.";
    }
  }
};

// Funções fictícias para enviar dados
const postUser = async (userData: UserValues, baseURL: string) => {
  await axios.post(`${baseURL}/users`, userData);
};

const postUserCompany = async (
  companyData: Partial<FormValues>,
  baseURL: string
) => {
  await axios.post(`${baseURL}/companies`, companyData);
};
