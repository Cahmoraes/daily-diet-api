import { MealRepository } from '@/repositories/MealRepository'
import { Meal } from '@prisma/client'

interface FindManyByUserMealUseCaseRequest {
  userId: string
}

interface FindManyByUserMealUseCaseResponse {
  meals: Meal[]
}

export class FindManyByUserMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  public async execute(
    params: FindManyByUserMealUseCaseRequest,
  ): Promise<FindManyByUserMealUseCaseResponse> {
    const meals = await this.mealRepository.getAllByUser(params)
    return { meals }
  }
}
