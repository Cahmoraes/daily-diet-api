import { InMemory } from '@/repositories/InMemory'
import { AuthenticateUserUseCase } from '@/use-cases/user/AuthenticateUserUseCase'

export function makeAuthenticateUserInMemoryUseCase() {
  const userRepository = new InMemory()
  return new AuthenticateUserUseCase(userRepository)
}
