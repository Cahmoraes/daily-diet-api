import { makeGetAllMealByUserUseCase } from '@/use-cases/factories/meal/makeGetAllMealByUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const findManyMealByUserParams = z.object({
  userId: z.string(),
})

type MealParamSchema = z.infer<typeof findManyMealByUserParams>

export class FindManyMealByUserController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = this.parseParamRequestOrThrow(request.params)
    const { meals } = await this.findManyMealByUser({ userId })
    return reply.status(201).send({ meals })
  }

  private parseParamRequestOrThrow(params: unknown): MealParamSchema {
    return findManyMealByUserParams.parse(params)
  }

  private async findManyMealByUser(mealDTO: MealParamSchema) {
    try {
      return this.performFindManyMealByUser(mealDTO)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async performFindManyMealByUser(mealDTO: MealParamSchema) {
    const getAllMealByUerUseCase = makeGetAllMealByUserUseCase()
    return getAllMealByUerUseCase.execute(mealDTO)
  }
}
