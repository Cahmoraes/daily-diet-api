import { PrismaMealRepository } from '@/repositories/prisma/PrismaMealRepository'
import { FindManyByUserMealUseCase as GetAllMealByUserUseCase } from '@/use-cases/meal/FindManyByUserMealUseCase'

export function makeGetAllMealByUserUseCase() {
  const mealRepository = new PrismaMealRepository()
  return new GetAllMealByUserUseCase(mealRepository)
}
