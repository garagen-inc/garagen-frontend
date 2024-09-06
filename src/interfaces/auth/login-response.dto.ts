import { UserDTO } from '../user/user.dto'

export interface LoginResponseDTO {
  access_token: string
  user: UserDTO
}
