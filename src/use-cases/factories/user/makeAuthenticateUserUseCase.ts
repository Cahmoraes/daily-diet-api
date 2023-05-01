import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { AuthenticateUserUseCase } from '@/use-cases/user/AuthenticateUserUseCase'

export function makeAuthenticateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  return new AuthenticateUserUseCase(userRepository)
}
