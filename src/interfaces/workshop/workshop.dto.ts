import { AddressDTO } from '../address/address.dto'

export interface WorkshopDTO {
  id: number
  name: string
  description: string
  address?: AddressDTO
  workshopImage: string | null
}
