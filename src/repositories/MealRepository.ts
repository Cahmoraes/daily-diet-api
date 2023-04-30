import { MealDTO } from '@/interfaces/MealDTO'

export interface MealRepository {
  create(params: MealDTO): Promise<void>
}
