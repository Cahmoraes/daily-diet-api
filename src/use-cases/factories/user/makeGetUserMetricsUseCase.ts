import { PrismaMealRepository } from '@/repositories/prisma/PrismaMealRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { GetUserMetricsUseCase } from '@/use-cases/user/GetUserMetricsUseCase'

export function makeGetUserMetricsUseCase() {
  const mealRepository = new PrismaMealRepository()
  const userRepository = new PrismaUserRepository()
  return new GetUserMetricsUseCase(mealRepository, userRepository)
}
