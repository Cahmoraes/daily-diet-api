import { MealDTO } from '@/interfaces/MealDTO'
import { Meal } from '@prisma/client'

export interface UpdateMealParams extends MealDTO {
  mealId: string
}

export interface DeleteMealParams {
  mealId: string
  userId: string
}

export interface GetAllMealByUserParams {
  userId: string
}

export interface MealRepository {
  create(params: MealDTO): Promise<void>
  update(params: UpdateMealParams): Promise<void>
  delete(params: DeleteMealParams): Promise<void>
  getAllByUser(params: GetAllMealByUserParams): Promise<Meal[]>
  findById(mealId: string): Promise<Meal | null>
}
