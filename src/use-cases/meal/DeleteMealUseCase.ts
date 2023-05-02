import { MealRepository } from '@/repositories/MealRepository'

interface DeleteMealUseCaseRequest {
  mealId: string
  userId: string
}

export class DeleteMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  public async execute(params: DeleteMealUseCaseRequest): Promise<void> {
    try {
      return await this.mealRepository.delete(params)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
