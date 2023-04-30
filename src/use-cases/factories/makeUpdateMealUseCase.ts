import { PrismaMealRepository } from '@/repositories/prisma/PrismaMealRepository'
import { UpdateMealUseCase } from '../meal/UpdateMealUseCase'

export function makeUpdateMealUseCase() {
  const mealRepository = new PrismaMealRepository()
  return new UpdateMealUseCase(mealRepository)
}
