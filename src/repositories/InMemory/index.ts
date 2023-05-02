import { UserDTO } from '@/interfaces/UserDTO'
import { User } from '@prisma/client'
import { AuthenticateUserParams } from '../UserRepository'
import { PrismaUserRepository } from '../prisma/PrismaUserRepository'
import { randomUUID } from 'node:crypto'

export class InMemory implements PrismaUserRepository {
  private users: User[] = []

  async authenticate(params: AuthenticateUserParams): Promise<User | null> {
    const userOrNull = this.users.find(
      (user) => params.email === user.email && params.name === user.name,
    )
    return userOrNull ?? null
  }

  async create(params: UserDTO): Promise<void> {
    this.users.push({ ...params, id: randomUUID() })
  }
}
