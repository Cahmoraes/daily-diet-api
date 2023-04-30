import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { CreateUserUseCase } from '../CreateUserUseCase'

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  return new CreateUserUseCase(userRepository)
}
