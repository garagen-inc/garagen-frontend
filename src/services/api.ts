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
import { UpdateWorkshopDTO } from '../interfaces/workshop/update-workshop.dto'
import { AddressDTO } from '../interfaces/address/address.dto'
import { UpdateAddressDTO } from '../interfaces/address/update-address.dto'
import { UpdateUserDTO } from '../interfaces/user/update-user.dto'
import { MeInfo } from '../interfaces/user/me-info.dto'
import { ChangePasswordUserDTO } from '../interfaces/user/change-password-user.dto'

export const api = axios.create({
  baseURL: 'http://localhost:3001', // backend | docker local port
  // baseURL: 'https://garager-backend.onrender.com',
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
  async changePassword(data: ChangePasswordUserDTO): Promise<UserDTO> {
    return (
      (await api.patch('/users/change-password', data))
        .data as DefaultApiResponse<UserDTO>
    ).data
  },
  async updateUser(data: UpdateUserDTO): Promise<LoginResponseDTO> {
    return (
      (await api.patch('/users', data))
        .data as DefaultApiResponse<LoginResponseDTO>
    ).data
  },
  async deleteUser(): Promise<void> {
    return await api.delete('/users')
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
  async updateWorkshop(data: UpdateWorkshopDTO): Promise<WorkshopDTO> {
    return (
      (await api.patch('/workshop', data))
        .data as DefaultApiResponse<WorkshopDTO>
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
  async getAddress(addressId: number): Promise<AddressDTO> {
    return (
      (await api.get(`/address/${addressId}`))
        .data as DefaultApiResponse<AddressDTO>
    ).data
  },
  async updateAddress(data: UpdateAddressDTO): Promise<AddressDTO> {
    return (
      (await api.patch('/address', data)).data as DefaultApiResponse<AddressDTO>
    ).data
  },
}
