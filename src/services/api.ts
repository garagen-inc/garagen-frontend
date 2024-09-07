import axios from 'axios'
import { LoginResponseDTO } from '../interfaces/auth/login-response.dto'
import { WorkshopDTO } from '../interfaces/workshop/workshop.dto'
import { CreateUserDTO } from '../interfaces/user/create-user.dto'
import { UserDTO } from '../interfaces/user/user.dto'
import { CreateUserWorkshopDTO } from '../interfaces/user/create-user-workshop.dto'
import { AvailableSlotDTO } from '../interfaces/availableSlot/available-slot.dto'
import { CreateAvailableSlotDTO } from '../interfaces/availableSlot/create-available-slot.dto'
import { StorageService } from './storage'
import { StorageKeys } from '../constants/enums'
import { CreateAppointmentDTO } from '../interfaces/appointment/create-appointment.dto'
import { AppointmentDTO } from '../interfaces/appointment/appointment.dto'

export const api = axios.create({
  baseURL: 'https://garager-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: StorageService.getItem<string>(StorageKeys.ACCESS_TOKEN)
      ? `Bearer ${StorageService.getItem<string>(StorageKeys.ACCESS_TOKEN)}`
      : undefined,
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
  async createAppointment(data: CreateAppointmentDTO): Promise<AppointmentDTO> {
    return (
      (await api.post('/appointments/create', data))
        .data as DefaultApiResponse<AppointmentDTO>
    ).data
  },
  async listAppointments(workshopId: string): Promise<AppointmentDTO[]> {
    return (
      (await api.get(`/appointments/workshop/${workshopId}`))
        .data as DefaultApiResponse<AppointmentDTO[]>
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
  async findWorkshop(workshopId: string): Promise<WorkshopDTO> {
    return (
      (await api.get(`/workshop/${workshopId}`))
        .data as DefaultApiResponse<WorkshopDTO>
    ).data
  },
  async createAvailableSlot(
    data: CreateAvailableSlotDTO
  ): Promise<AvailableSlotDTO> {
    return (
      (await api.post(`/available-slot/create`, data))
        .data as DefaultApiResponse<AvailableSlotDTO>
    ).data
  },
  async findWorkshopAvailableSlots(
    workshopId: string
  ): Promise<AvailableSlotDTO[]> {
    return (
      (await api.get(`/available-slot/workshop/${workshopId}`))
        .data as DefaultApiResponse<AvailableSlotDTO[]>
    ).data
  },
}
