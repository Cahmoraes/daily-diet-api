import { UserDTO } from '@/interfaces/UserDTO'
import { AuthenticateUserParams, UserRepository } from '../UserRepository'
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export class PrismaUserRepository implements UserRepository {
  authenticate(params: AuthenticateUserParams): Promise<User | null> {
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
