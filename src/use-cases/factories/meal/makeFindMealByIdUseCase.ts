import { PrismaMealRepository } from '@/repositories/prisma/PrismaMealRepository'
import { FindMealByIdUseCase } from '@/use-cases/meal/FindMealByIdUseCase'

export function makeFindMealByIdUseCase() {
  const mealRepository = new PrismaMealRepository()
  return new FindMealByIdUseCase(mealRepository)
}
