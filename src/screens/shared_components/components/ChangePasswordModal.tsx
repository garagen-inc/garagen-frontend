import React, { useState } from 'react'
import InputForm from '../../auth/assets/components/InputForm'
import toast from 'react-hot-toast'
import { digestApiError } from '../../../utils/functions'
import { useMutation } from '@tanstack/react-query'
import { QueryKeys } from '../../../constants/enums'
import { GaragerApi } from '../../../services/api'
import { UserDTO } from '../../../interfaces/user/user.dto'
import { maskCPF, maskPhoneNumber } from '../../auth/assets/functions/masks'
import { ChangePasswordUserDTO } from '../../../interfaces/user/change-password-user.dto'

interface ModalProps {
  user: UserDTO
  onClose: () => void
  onConfirm: () => void
}

const ChangePasswordModal: React.FC<ModalProps> = ({
  user,
  onClose,
  onConfirm,
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QueryKeys.UPDATE_USER],
    mutationFn: async (data: ChangePasswordUserDTO) => {
      return await GaragerApi.changePassword(data)
    },
    onSuccess: async () => {
      toast.success('Sua senha foi alterada com sucesso!', { duration: 4000 })
      onConfirm()
    },
    onError: (error) => {
      toast.error(digestApiError(error))
    },
  })

  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
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
    setError('')
  }

  const onSubmit = async () => {
    const { password, confirmPassword } = formValues

    if (!password || !confirmPassword) {
      setError('Por favor, insira seu nome completo.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    await mutateAsync({
      id: user.id,
      password,
    })
  }

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
          <h2 className="text-xl font-bold mb-4">Alterar senha</h2>
          <div className="my-4 gap-4 flex flex-col">
            <form className="space-y-4" onSubmit={onSubmit}>
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
                  {error}
                </div>
              )}
              <InputForm
                isRequired={true}
                nameid="password"
                span="Senha"
                type="password"
                value={formValues.password}
                onChange={onChange}
              />
              <InputForm
                isRequired={true}
                nameid="confirmPassword"
                span="Confirme sua senha"
                type="password"
                value={formValues.confirmPassword}
                onChange={onChange}
              />
            </form>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Fechar
            </button>
            <button
              onClick={onSubmit}
              disabled={
                isPending ||
                !!error ||
                !formValues.password ||
                !formValues.confirmPassword
              }
              className={`px-4 py-2 rounded ${
                !isPending &&
                !error &&
                formValues.password &&
                formValues.confirmPassword
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              }`}
            >
              {isPending ? 'Carregando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePasswordModal
