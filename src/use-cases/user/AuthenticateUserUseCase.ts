import { UserRepository } from '@/repositories/UserRepository'
import { User } from '@prisma/client'
interface AuthenticateUserUseCaseRequest {
  name: string
  email: string
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    name,
    email,
  }: AuthenticateUserUseCaseRequest): Promise<User | null> {
    return this.userRepository.authenticate({
      name,
      email,
    })
  }
}
