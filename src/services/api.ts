import axios from 'axios'
import { LoginResponseDTO } from '../interfaces/auth/login-response.dto'
import { WorkshopDTO } from '../interfaces/workshop/workshop.dto'
import { CreateUserDTO } from '../interfaces/user/create-user.dto'
import { UserDTO } from '../interfaces/user/user.dto'
import { CreateUserWorkshopDTO } from '../interfaces/user/create-user-workshop.dto'

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
  async createUser(data: CreateUserDTO): Promise<UserDTO> {
    return (
      (await api.post('/users/create', data))
        .data as DefaultApiResponse<UserDTO>
    ).data
  },
  async createWorkshopUser(data: CreateUserWorkshopDTO): Promise<UserDTO> {
    return (
      (await api.post('/users/create-workshop-owner', data))
        .data as DefaultApiResponse<UserDTO>
    ).data
  },
  async listWorkshops(): Promise<WorkshopDTO[]> {
    return (
      (await api.get('/workshop')).data as DefaultApiResponse<WorkshopDTO[]>
    ).data
  },
}
