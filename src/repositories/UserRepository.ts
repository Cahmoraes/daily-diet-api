import { UserDTO } from '@/interfaces/UserDTO'
import { User } from '@prisma/client'

export interface AuthenticateUserParams {
  name: string
  email: string
}

export interface UserRepository {
  create(params: UserDTO): Promise<void>
  authenticate(params: AuthenticateUserParams): Promise<User | null>
}
