import { MealDTO } from '@/interfaces/MealDTO'

export interface UpdateMealParams extends MealDTO {
  mealId: string
}

export interface DeleteMealParams {
  mealId: string
}

export interface MealRepository {
  create(params: MealDTO): Promise<void>
  update(params: UpdateMealParams): Promise<void>
  delete(params: DeleteMealParams): Promise<void>
}
