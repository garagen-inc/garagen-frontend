import axios from 'axios'
import { LoginResponseDTO } from '../interfaces/auth/login-response.dto'

export const api = axios.create({
  baseURL: 'https://garager-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export type DefaultApiResponse<T> = {
  data: T
  message: string
  devMessage: string
}

export const GaragerApi = {
  async login(email: string, password: string): Promise<LoginResponseDTO> {
    return (
      (await api.post('/auth/login', { email, password }))
        .data as DefaultApiResponse<LoginResponseDTO>
    ).data
  },
}
