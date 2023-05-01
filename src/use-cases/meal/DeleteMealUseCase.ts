import { MealRepository } from '@/repositories/MealRepository'

interface DeleteMealUseCaseRequest {
  mealId: string
}

export class DeleteMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  public async execute(params: DeleteMealUseCaseRequest): Promise<void> {
    return this.mealRepository.delete(params)
  }
}
