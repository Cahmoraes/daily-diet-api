import { makeGetAllMealByUserUseCase } from '@/use-cases/factories/meal/makeGetAllMealByUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createUserIdSchema = z.string().uuid()

type UserIdData = z.infer<typeof createUserIdSchema>

export class GetAllMealByUserController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const userId = this.parseUserIdOrThrow(request.user.id)
    const { meals } = await this.findManyMealByUser(userId)
    return reply.status(200).send({ meals })
  }

  private parseUserIdOrThrow(params: unknown): UserIdData {
    return createUserIdSchema.parse(params)
  }

  private async findManyMealByUser(userId: UserIdData) {
    try {
      return this.performFindManyMealByUser(userId)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async performFindManyMealByUser(userId: UserIdData) {
    const getAllMealByUerUseCase = makeGetAllMealByUserUseCase()
    return getAllMealByUerUseCase.execute({ userId })
  }
}
