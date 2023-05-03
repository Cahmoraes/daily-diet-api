import { MealRepository } from '@/repositories/MealRepository'
import {
  GetTotalMealsInDietByDateResponse,
  UserRepository,
} from '@/repositories/UserRepository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  totalRegisteredMeals: number
  totalMealsInDiet: number
  totalMealsOffDiet: number
  betterSequenceMealsInDietByDate: GetTotalMealsInDietByDateResponse
}

export class GetUserMetricsUseCase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const [
      totalRegisteredMeals,
      totalMealsInDiet,
      totalMealsOffDiet,
      betterSequenceMealsInDietByDate,
    ] = await this.performUserMetrics(userId)

    return {
      totalRegisteredMeals,
      totalMealsInDiet,
      totalMealsOffDiet,
      betterSequenceMealsInDietByDate,
    }
  }

  private async performUserMetrics(userId: string) {
    return await Promise.all([
      this.getTotalRegisteredMeals(userId),
      this.getTotalTotalMealsInDiet(userId),
      this.getTotalTotalMealsOffDiet(userId),
      this.getBetterSequenceMealsInDietByDate(
        await this.getTotalMealsInDietByDate(userId),
      ),
    ])
  }

  private getTotalRegisteredMeals(userId: string) {
    return this.mealRepository.countByUserId(userId)
  }

  private getTotalTotalMealsInDiet(userId: string) {
    return this.userRepository.getTotalMealsInDiet(userId)
  }

  private getTotalTotalMealsOffDiet(userId: string) {
    return this.userRepository.getTotalMealsOffDiet(userId)
  }

  private getTotalMealsInDietByDate(userId: string) {
    return this.userRepository.getTotalMealsInDietByDate(userId)
  }

  private async getBetterSequenceMealsInDietByDate(
    params: GetTotalMealsInDietByDateResponse[],
  ) {
    return params[0]
  }
}
