import { UserRepository } from '@/repositories/UserRepository'

interface DeleteMealUseCaseRequest {
  mealId: string
  userId: string
}

export class DeleteMealUseCase {
  constructor(private mealRepository: UserRepository) {}

  public async execute(params: DeleteMealUseCaseRequest): Promise<void> {
    try {
      return await this.mealRepository.deleteMealByUserId(params)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
