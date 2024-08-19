import validateCPF from "./validatorCPF";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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
  awaitRegisterCompany: boolean = false
): Promise<string | null> => {
  // Modificado para retornar o erro
  event.preventDefault();

  if (isUserForm) {
    const { email, password, username, surname, confirmPassword, cpf } =
      formValues;

    if (!username || !surname) {
      return "Por favor, insira seu nome completo.";
    }

    if (!validateCPF(cpf)) {
      return "CPF inválido.";
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
      try {
        await postUser(formValues); // Envia o formulário do usuário
        console.log("Usuário registrado com sucesso!");
        return null;
      } catch (error) {
        return "Erro ao registrar o usuário.";
      }
    } else {
      return null;
    }
  } else {
    const { companyName, address, number, postalCode } = formValues;

    if (!companyName || !address || !number || !postalCode) {
      return "Por favor, preencha todos os campos da empresa.";
    }

    try {
      await postCompany({ companyName, address, number, postalCode });
      console.log("Empresa registrada com sucesso!");
      return null;
    } catch (error) {
      return "Erro ao registrar a empresa.";
    }
  }
};

// Funções fictícias para enviar dados
const postUser = async (userData: FormValues) => {
  // Implementar a lógica para enviar o registro do usuário
};

const postCompany = async (companyData: Partial<FormValues>) => {
  // Implementar a lógica para enviar o registro da empresa
};
