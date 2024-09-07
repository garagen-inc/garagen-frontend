import React, { useState } from 'react'
import UserForm from './components/UserForm'
import { handleFormSubmit } from './functions/handleFormSubmit'
import { maskCPF, maskPhoneNumber } from './functions/masks'
import { useMutation } from '@tanstack/react-query'
import { QueryKeys } from '../../../constants/enums'
import { GaragerApi } from '../../../services/api'
import { CreateUserDTO } from '../../../interfaces/user/create-user.dto'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { digestApiError } from '../../../utils/functions'

export const FormRegisterUser: React.FC = () => {
  const navigate = useNavigate()

  const [error, setError] = useState<string | null>(null)
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    username: '',
    surname: '',
    confirmPassword: '',
    cpf: '',
    phone: '',
  })

  const { mutateAsync: handleCreateUser, isPending } = useMutation({
    mutationKey: [QueryKeys.CREATE_USER],
    onError: (e) => {
      setError(digestApiError(e))
    },
    mutationFn: async (data: CreateUserDTO) => {
      return await GaragerApi.createUser(data)
    },
    onSuccess: () => {
      toast.success('Usuário cadastrado com sucesso!', { duration: 4000 })
      navigate('/login')
    },
  })

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const resultError = await handleFormSubmit(
      event,
      setError,
      formValues,
      true,
      false,
      handleCreateUser
    )
    if (resultError) {
      setError(resultError)
    }
  }

  return (
    <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
      <span className="mb-3 text-4xl font-bold">É um prazer te conhecer</span>
      <span className="font-light text-gray-400 mb-8">
        Insira seus dados para continuar:
      </span>
      <UserForm
        isLoading={isPending}
        formValues={formValues}
        onChange={handleChange}
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  )
}

export default FormRegisterUser
