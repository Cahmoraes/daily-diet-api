import { PrismaMealRepository } from '@/repositories/prisma/PrismaMealRepository'
import { GetUserMetricsUseCase } from '@/use-cases/user/GetUserMetricsUseCase'

export function makeGetUserMetricsUseCase() {
  const mealRepository = new PrismaMealRepository()
  return new GetUserMetricsUseCase(mealRepository)
}
