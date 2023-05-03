import { makeGetUserMetricsUseCase } from '@/use-cases/factories/user/makeGetUserMetricsUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createUserIdSchema = z.string().uuid()
type UserIdData = z.infer<typeof createUserIdSchema>

export class GetUserMetricsController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const userId = this.parseUserIdOrThrow(request.user.id)
    const { totalRegisteredMeals } = await this.getUserMetrics(userId)
    return reply.status(200).send({ totalRegisteredMeals })
  }

  private parseUserIdOrThrow(params: unknown): UserIdData {
    return createUserIdSchema.parse(params)
  }

  private async getUserMetrics(userId: string) {
    try {
      return await this.performGetUserMetrics(userId)
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao obter user metrics')
    }
  }

  private async performGetUserMetrics(userId: string) {
    const getMetricsUseCase = makeGetUserMetricsUseCase()
    return getMetricsUseCase.execute({ userId })
  }
}
