import { UserDTO } from '@/interfaces/UserDTO'

export interface UserRepository {
  create(params: UserDTO): Promise<void>
}
