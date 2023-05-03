import { DeleteMealUseCase } from '../../meal/DeleteMealUseCase'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'

export function makeDeleteMealUseCase() {
  const mealRepository = new PrismaUserRepository()
  return new DeleteMealUseCase(mealRepository)
}
