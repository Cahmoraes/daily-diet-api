import { PrismaMealRepository } from '@/repositories/prisma/PrismaMealRepository'
import { DeleteMealUseCase } from '../../meal/DeleteMealUseCase'

export function makeDeleteMealUseCase() {
  const mealRepository = new PrismaMealRepository()
  return new DeleteMealUseCase(mealRepository)
}
