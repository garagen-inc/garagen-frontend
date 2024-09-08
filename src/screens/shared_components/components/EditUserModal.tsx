import React, { useState } from 'react'
import InputForm from '../../auth/assets/components/InputForm'
import toast from 'react-hot-toast'
import { digestApiError, validateEmail } from '../../../utils/functions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '../../../constants/enums'
import { GaragerApi } from '../../../services/api'
import { UserDTO } from '../../../interfaces/user/user.dto'
import validateCPF from '../../auth/assets/functions/validatorCPF'
import { UpdateUserDTO } from '../../../interfaces/user/update-user.dto'
import { useAuth } from '../../../contexts/AuthContext'
import { maskCPF, maskPhoneNumber } from '../../auth/assets/functions/masks'

interface ModalProps {
  user: UserDTO
  onClose: () => void
  onConfirm: () => void
}

const EditUserModal: React.FC<ModalProps> = ({ user, onClose, onConfirm }) => {
  const queryClient = useQueryClient()
  const { login, logout } = useAuth()

  const deleteAccountMutation = useMutation({
    mutationKey: [QueryKeys.DELETE_ACCOUNT],
    mutationFn: async () => {
      return await GaragerApi.deleteUser()
    },
    onSuccess: async () => {
      if (!user) return
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LOGIN, QueryKeys.USER],
      })

      logout()
      toast.success('Sua conta foi excluída com segurança!', { duration: 4000 })
      onConfirm()
    },
    onError: (error) => {
      toast.error(digestApiError(error))
    },
  })

  const deleteAccount = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    deleteAccountMutation.mutateAsync()
    e.stopPropagation()
    e.preventDefault()
  }

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QueryKeys.UPDATE_USER],
    mutationFn: async (data: UpdateUserDTO) => {
      return await GaragerApi.updateUser(data)
    },
    onSuccess: async (res) => {
      if (!user) return
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LOGIN, QueryKeys.USER],
      })

      login(res.access_token, res.user)
      toast.success('Usuário atualizado com sucesso!', { duration: 4000 })
      onConfirm()
    },
    onError: (error) => {
      toast.error(digestApiError(error))
    },
  })

  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState({
    email: user.email,
    username: user.name.split(' ')[0],
    surname: user.name.split(' ').slice(1).join(' '),
    cpf: user.cpf,
    phone: user.phone,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    event.preventDefault()
    const { email, username, surname, cpf, phone } = formValues

    if (!username || !surname) {
      setError('Por favor, insira seu nome completo.')
      return
    }

    if (!validateCPF(cpf)) {
      setError('CPF inválido.')
      return
    }

    if (!phone) {
      setError('Por favor, insira seu telefone.')
      return
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.')
      return
    }

    await mutateAsync({
      id: user.id,
      name: `${username} ${surname}`,
      phone,
      cpf,
      email,
    })
  }

  const isLoading = deleteAccountMutation.isPending || isPending

  return (
    <>
      <div
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Editar informações</h2>
          <p className="text-sm font-normal mb-4">
            Altere seus dados pessoais.
          </p>

          <div className="my-4 gap-4 flex flex-row xl:flex-row sm:flex-col">
            <form className="space-y-4" onSubmit={onSubmit}>
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
                  {error}
                </div>
              )}
              <div className="flex flex-row gap-4">
                <InputForm
                  isRequired={true}
                  disabled={isLoading}
                  nameid="username"
                  span="Nome"
                  type="text"
                  value={formValues.username}
                  onChange={onChange}
                />
                <InputForm
                  isRequired={true}
                  disabled={isLoading}
                  nameid="surname"
                  span="Sobrenome"
                  type="text"
                  value={formValues.surname}
                  onChange={onChange}
                />
              </div>
              <InputForm
                isRequired={true}
                disabled={isLoading}
                nameid="cpf"
                span="CPF (apenas números)"
                type="text"
                value={formValues.cpf}
                onChange={onChange}
              />
              <InputForm
                isRequired={true}
                disabled={isLoading}
                nameid="phone"
                span="Número de telefone"
                type="text"
                value={formValues.phone}
                onChange={onChange}
              />
              <InputForm
                isRequired={true}
                disabled={isLoading}
                nameid="email"
                span="Email"
                type="text"
                value={formValues.email}
                onChange={onChange}
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={deleteAccount}
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  Excluir conta
                </button>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !formValues.cpf ||
                      !formValues.email ||
                      !formValues.phone ||
                      !formValues.username ||
                      !formValues.surname
                    }
                    className={`px-4 py-2 rounded ${
                      !isLoading &&
                      formValues.cpf &&
                      formValues.email &&
                      formValues.phone &&
                      formValues.username &&
                      formValues.surname
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300'
                    }`}
                  >
                    {isLoading ? 'Carregando...' : 'Confirmar'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUserModal
