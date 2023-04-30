import { PrismaMealRepository } from '@/repositories/prisma/PrismaMealRepository'
import { CreateMealUseCase } from '../CreateMealUseCase'

export function makeCreateMealUseCase() {
  const mealRepository = new PrismaMealRepository()
  return new CreateMealUseCase(mealRepository)
}
