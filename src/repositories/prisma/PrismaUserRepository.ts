import { UserDTO } from '@/interfaces/UserDTO'
import {
  AuthenticateUserParams,
  DeleteMealByIdParams,
  UserRepository,
} from '../UserRepository'
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export class PrismaUserRepository implements UserRepository {
  async deleteMealByUserId(params: DeleteMealByIdParams): Promise<void> {
    await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        meal: {
          delete: {
            id: params.mealId,
          },
        },
      },
    })
  }

  async authenticate(params: AuthenticateUserParams): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email: params.email,
      },
    })
  }

  async create(params: UserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        ...params,
      },
    })
  }

  async getTotalMealsInDiet(userId: string): Promise<number> {
    return prisma.meal.count({
      where: {
        userId,
        inDiet: false,
      },
    })
  }

  async getTotalMealsOffDiet(userId: string): Promise<number> {
    return prisma.meal.count({
      where: {
        userId,
        inDiet: false,
      },
    })
  }

  async getTotalMealsInDietByDate(userId: string) {
    return prisma.meal.groupBy({
      by: ['date'],
      _count: {
        inDiet: true,
      },
      where: {
        userId,
        inDiet: true,
      },
      orderBy: {
        _count: {
          inDiet: 'desc',
        },
      },
    })
  }
}
