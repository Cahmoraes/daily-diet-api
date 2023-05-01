import { UserRepository } from '@/repositories/UserRepository'

interface AuthenticateUserUseCaseRequest {
  name: string
  email: string
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    name,
    email,
  }: AuthenticateUserUseCaseRequest): Promise<void> {
    try {
      const user = await this.userRepository.authenticate({
        name,
        email,
      })

      if (!user) {
        throw new Error('User Invalid')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
