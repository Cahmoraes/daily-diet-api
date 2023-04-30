import { PrismaMealRepository } from '@/repositories/prisma/PrismaMealRepository'
import { CreateMealUseCase } from '../meal/CreateMealUseCase'

export function makeCreateMealUseCase() {
  const mealRepository = new PrismaMealRepository()
  return new CreateMealUseCase(mealRepository)
}
