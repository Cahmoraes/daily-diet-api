import { MealRepository } from '@/repositories/MealRepository'

interface UpdateMealUseCaseRequest {
  userId: string
  mealId: string
  name: string
  description: string
  date: string
  hours: string
  inDiet: boolean
}

export class UpdateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  public async execute(params: UpdateMealUseCaseRequest): Promise<void> {
    return this.mealRepository.update(params)
  }
}
