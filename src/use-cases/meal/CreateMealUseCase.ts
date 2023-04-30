import { MealRepository } from '@/repositories/MealRepository'

interface CreateMealUseCaseRequest {
  userId: string
  name: string
  description: string
  date: string
  hours: string
  inDiet: boolean
}

export class CreateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  public async execute(params: CreateMealUseCaseRequest): Promise<void> {
    return this.mealRepository.create(params)
  }
}
