import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { CreateUserDTO } from '../../../../interfaces/user/create-user.dto'
import validateCPF from './validatorCPF'
import { UserDTO } from '../../../../interfaces/user/user.dto'
import { CreateUserWorkshopDTO } from '../../../../interfaces/user/create-user-workshop.dto'

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

interface UserValues {
  name: string
  password: string
  phone: string
  cpf: string
  email: string
}

interface FormValues {
  email: string
  password: string
  username: string
  surname: string
  confirmPassword: string
  cpf: string
  phone: string

  companyName?: string
  address?: string
  number?: string
  postalCode?: string
  state?: string
  city?: string
  workshop_description?: string
}

export const handleFormSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  formValues: FormValues,
  isUserForm: boolean = true,
  awaitRegisterCompany: boolean = false,
  onCreateUser?: UseMutateAsyncFunction<UserDTO, Error, CreateUserDTO, unknown>,
  onCreateUserWorkshop?: UseMutateAsyncFunction<
    UserDTO,
    Error,
    CreateUserWorkshopDTO,
    unknown
  >
): Promise<string | null> => {
  event.preventDefault()

  if (isUserForm) {
    const { email, password, username, surname, confirmPassword, cpf, phone } =
      formValues

    if (!username || !surname) {
      return 'Por favor, insira seu nome completo.'
    }

    if (!validateCPF(cpf)) {
      return 'CPF inválido.'
    }

    if (!phone) {
      return 'Por favor, insira seu telefone.'
    }

    if (!validateEmail(email)) {
      return 'Por favor, insira um e-mail válido.'
    }

    if (!password) {
      return 'Por favor, insira sua senha.'
    }

    if (password !== confirmPassword) {
      return 'Senhas não coincidem.'
    }

    if (awaitRegisterCompany === false) {
      // Cria o objeto no formato esperado por postUser
      const userData: UserValues = {
        name: `${username} ${surname}`, // Nome completo no formato esperado
        password,
        phone,
        cpf,
        email,
      }

      try {
        await onCreateUser?.(userData)
        return null
      } catch (error) {
        return 'Erro ao registrar o usuário.'
      }
    } else {
      return null
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
      city,
      state,
      workshop_description,
    } = formValues

    if (password !== confirmPassword) {
      return 'As senhas devem coincidir.'
    }

    if (
      !companyName ||
      !address ||
      !number ||
      !postalCode ||
      !city ||
      !state ||
      !workshop_description
    ) {
      return 'Por favor, preencha todos os campos da empresa.'
    }

    try {
      await onCreateUserWorkshop?.({
        name: username + ' ' + surname,
        email,
        phone,
        cpf,
        password,
        workshop_name: companyName,
        workshop_description,
        address_name: number,
        street: address,
        city: city,
        zip_code: postalCode,
        state: state,
      })

      return null
    } catch (error) {
      return 'Erro ao registrar a empresa.'
    }
  }
}
