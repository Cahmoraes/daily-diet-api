import { MealDTO } from '@/interfaces/MealDTO'

export interface MealUpdateParams extends MealDTO {
  mealId: string
}

export interface MealRepository {
  create(params: MealDTO): Promise<void>
  update(params: MealUpdateParams): Promise<void>
}
