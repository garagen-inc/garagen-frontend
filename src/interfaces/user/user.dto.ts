import { WorkshopDTO } from '../workshop/workshop.dto'

export interface UserDTO {
  id: number
  name: string
  email: string
  phone: string
  cpf: string
  password: string
  isWorkshopOwner: boolean
  workshop_id: number | null
  workshop?: WorkshopDTO
  // appointments?: AppointmentEntity[]
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
