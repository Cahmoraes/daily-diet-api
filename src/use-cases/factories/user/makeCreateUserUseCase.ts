import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { CreateUserUseCase } from '../../user/CreateUserUseCase'

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  return new CreateUserUseCase(userRepository)
}
