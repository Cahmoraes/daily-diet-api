import { UserRepository } from '@/repositories/UserRepository'

interface CreateUserUseCaseRequest {
  name: string
  email: string
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    name,
    email,
  }: CreateUserUseCaseRequest): Promise<void> {
    return this.userRepository.create({
      name,
      email,
    })
  }
}
