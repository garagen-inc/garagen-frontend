import { isAxiosError } from 'axios'

type DefaultErrorResponse = {
  status: number
  devMessage: string
  message: string
}

export function digestApiError(e: any) {
  if (isAxiosError(e)) {
    if (e.response && e.response.data) {
      return (e.response.data as DefaultErrorResponse).message
    }
  }
  return 'Erro desconhecido'
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
