import { MealRepository } from '@/repositories/MealRepository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  totalRegisteredMeals: number
}

export class GetUserMetricsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    return {
      totalRegisteredMeals: await this.getTotalRegisteredMeals(userId),
    }
  }

  private getTotalRegisteredMeals(userId: string) {
    return this.mealRepository.countByUserId(userId)
  }
}
