import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { QueryKeys } from '../../../constants/enums'
import { GaragerApi } from '../../../services/api'
import { digestApiError } from '../../../utils/functions'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export const FormLogin: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QueryKeys.LOGIN],
    mutationFn: async (params: { email: string; password: string }) => {
      const response = await GaragerApi.login(params.email, params.password)
      login(response.access_token, response.user)
      navigate('/')
    },
    onError: (e) => {
      setError(digestApiError(e))
    },
  })

  // State para armazenar a mensagem de erro
  const [error, setError] = useState<string | null>(null)

  // Função para validar o e-mail
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const email = form.email.value
    const password = form.password.value

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.')
      return
    }

    if (!password) {
      setError('Por favor, insira sua senha.')
      return
    }

    setError(null)

    mutateAsync({ email, password })
  }

  return (
    <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
      <span className="mb-3 text-4xl font-bold">Bem-vindo de volta</span>
      <span className="font-light text-gray-400 mb-8">
        Insira seus dados para continuar:
      </span>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {error}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="py-1">
          <span className="mb-2 text-md">Email</span>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="email"
            id="email"
            required
          />
        </div>
        <div className="py-1">
          <span className="mb-2 text-md">Senha</span>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gg-rich-black text-white p-2 rounded-lg mb-6 transition-colors duration-200 ease-in-out hover:bg-gg-lavender-blush hover:text-black hover:border hover:border-gray-300"
        >
          {isPending ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default FormLogin
