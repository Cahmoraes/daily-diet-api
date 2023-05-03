import { UserDTO } from '@/interfaces/UserDTO'
import { User } from '@prisma/client'

export interface AuthenticateUserParams {
  name: string
  email: string
}

export interface DeleteMealByIdParams {
  userId: string
  mealId: string
}

export interface GetTotalMealsInDietByDateParams {
  userId: string
  date: string
}

export interface GetTotalMealsInDietByDateResponse {
  _count: {
    inDiet: number
  }
  date: string
}

export interface UserRepository {
  create(params: UserDTO): Promise<void>
  authenticate(params: AuthenticateUserParams): Promise<User | null>
  deleteMealByUserId(params: DeleteMealByIdParams): Promise<void>
  getTotalMealsInDiet(userId: string): Promise<number>
  getTotalMealsOffDiet(userId: string): Promise<number>
  getTotalMealsInDietByDate(
    userId: string,
  ): Promise<GetTotalMealsInDietByDateResponse[]>
}
