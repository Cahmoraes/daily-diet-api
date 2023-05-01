import { MealRepository } from '@/repositories/MealRepository'
import { Meal } from '@prisma/client'

interface FindMealByIdUseCaseRequest {
  mealId: string
}

interface FindMealByIdUseCaseResponse {
  meal: Meal | null
}

export class FindMealByIdUseCase {
  constructor(private mealRepository: MealRepository) {}

  public async execute({
    mealId,
  }: FindMealByIdUseCaseRequest): Promise<FindMealByIdUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId)
    return { meal }
  }
}
