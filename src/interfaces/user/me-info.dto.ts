import { UserDTO } from './user.dto'

export interface MeInfo extends UserDTO {
  password: string
}
