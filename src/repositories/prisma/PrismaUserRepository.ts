import { UserDTO } from '@/interfaces/UserDTO'
import { UserRepository } from '../UserRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements UserRepository {
  async create(params: UserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        ...params,
      },
    })
  }
}
