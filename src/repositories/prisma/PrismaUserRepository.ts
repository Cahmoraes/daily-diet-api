import { UserDTO } from '@/interfaces/UserDTO'
import {
  AuthenticateUserParams,
  DeleteMealByIdParams,
  UserRepository,
} from '../UserRepository'
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export class PrismaUserRepository implements UserRepository {
  async deleteMealById(params: DeleteMealByIdParams): Promise<void> {
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
}
