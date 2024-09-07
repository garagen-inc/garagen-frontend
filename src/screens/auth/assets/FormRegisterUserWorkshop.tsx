import React, { useState } from 'react'
import UserForm from './components/UserForm'
import CompanyForm from './components/CompanyForm'
import { handleFormSubmit } from './functions/handleFormSubmit'
import { maskCPF, maskPhoneNumber } from './functions/masks'
import { useMutation } from '@tanstack/react-query'
import { QueryKeys } from '../../../constants/enums'
import { CreateUserWorkshopDTO } from '../../../interfaces/user/create-user-workshop.dto'
import { GaragerApi } from '../../../services/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const FormRegisterUserWorkshop: React.FC = () => {
  const navigate = useNavigate()

  const [error, setError] = useState<string | null>(null)
  const [formValues, setFormValues] = useState({
    // User
    email: '',
    password: '',
    username: '',
    surname: '',
    confirmPassword: '',
    cpf: '',
    phone: '',
    // Company
    companyName: '',
    address: '', // street
    number: '',
    postalCode: '',
    city: '',
    state: '',
    workshop_description: '',
  })

  const [isUserForm, setIsUserForm] = useState(true) // Controla qual formulário exibir
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
    if (name === 'cpf') {
      setFormValues((prevValues) => ({
        ...prevValues,
        cpf: maskCPF(value),
      }))
    }
    if (name === 'phone') {
      setFormValues((prevValues) => ({
        ...prevValues,
        phone: maskPhoneNumber(value),
      }))
    }
  }

  const { mutateAsync: handleCreateWorkshopUser, isPending } = useMutation({
    mutationKey: [QueryKeys.CREATE_WORKSHOP_USER],
    mutationFn: async (data: CreateUserWorkshopDTO) => {
      return await GaragerApi.createWorkshopUser(data)
    },
    onSuccess: () => {
      toast.success('Usuário cadastrado com sucesso!', { duration: 4000 })
      navigate('/login')
    },
  })

  const validateUserForm = async (): Promise<boolean> => {
    const event = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>

    const resultError = await handleFormSubmit(
      event,
      setError,
      formValues,
      true,
      true,
      undefined,
      handleCreateWorkshopUser
    )
    console.log('Estado do erro após validação:', resultError)

    setError(resultError)
    return resultError === null // Retorna verdadeiro se não houver erro
  }

  const handleUserSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValid = await validateUserForm()
    if (isValid) {
      setIsUserForm(false) // Muda para o formulário de empresa
    }
  }

  const handleContinue = async () => {
    const isValid = await validateUserForm()
    if (isValid) {
      setIsUserForm(false) // Muda para o formulário de empresa
    }
  }

  const handleCompanySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    await handleFormSubmit(
      event,
      setError,
      formValues,
      false,
      false,
      undefined,
      handleCreateWorkshopUser
    )
    if (!error) {
      console.log('Formulário de empresa enviado com sucesso!')
    }
  }

  const switchForm = () => {
    setIsUserForm((prev) => !prev)
    setError(null) // Limpa erros ao alternar os formulários
  }

  return (
    <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
      <span className="mb-3 text-4xl font-bold">
        {isUserForm ? 'É um prazer te conhecer' : 'Informações da Empresa'}
      </span>
      <span className="font-light text-gray-400 mb-8">
        {isUserForm
          ? 'Insira seus dados para continuar:'
          : 'Insira os dados da empresa para continuar:'}
      </span>
      {isUserForm ? (
        <UserForm
          formValues={formValues}
          onChange={handleChange}
          onSubmit={handleUserSubmit}
          error={error}
          isLoading={isPending}
          showSubmitButton={false} // Oculta o botão de submit padrão
          onContinue={handleContinue} // Usa a função handleContinue
        />
      ) : (
        <CompanyForm
          isLoading={isPending}
          formValues={formValues}
          onChange={handleChange}
          onSubmit={handleCompanySubmit}
        />
      )}
      {!isUserForm && (
        <button
          type="button"
          disabled={isPending}
          onClick={switchForm}
          className="mt-4 w-full bg-gray-800 text-white p-2 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-600"
        >
          Voltar
        </button>
      )}
    </div>
  )
}

export default FormRegisterUserWorkshop
