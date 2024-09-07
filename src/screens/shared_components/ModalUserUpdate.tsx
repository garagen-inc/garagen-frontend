import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import UserForm from '../auth/assets/components/UserForm'
import { maskCPF, maskPhoneNumber } from '../auth/assets/functions/masks'
import { handleFormSubmit } from '../auth/assets/functions/handleFormSubmit'

const BASE_URL = 'https://api.example.com'

interface ModalUserUpdate {
  open: boolean
  onClose: () => void
  children?: React.ReactNode // Tornar children opcional
}

export default function Modal({ open, onClose, children }: ModalUserUpdate) {
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
  if (!open) return null // O modal só será renderizado se estiver aberto
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
    event.preventDefault() // Certifique-se de que o evento é prevenido
    const resultError = await handleFormSubmit(
      event,
      setError,
      formValues,
      true,
      false,
      BASE_URL
    )
    if (resultError) {
      setError(resultError)
    }
  }

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center transition-colors bg-black/50 w-full h-full z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Impede o clique de fechar o modal ao clicar dentro dele
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl m-6 max-h-[90vh] overflow-auto relative box-border"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-500 bg-white"
        >
          X
        </button>
        <UserForm
          formValues={formValues}
          onChange={handleChange}
          onSubmit={onSubmit}
          error={error}
          update={true}
        />
        {children}
      </div>
    </div>,
    document.body // Renderiza o modal diretamente dentro do body
  )
}
