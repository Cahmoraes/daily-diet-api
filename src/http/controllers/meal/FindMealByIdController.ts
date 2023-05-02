import { makeFindMealByIdUseCase } from '@/use-cases/factories/meal/makeFindMealByIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const findMealByIdParams = z.object({
  mealId: z.string(),
})

type MealParamSchema = z.infer<typeof findMealByIdParams>

export class FindMealByIdController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const { mealId } = this.parseParamRequestOrThrow(request.params)
    const { meal } = await this.findMealById({ mealId })
    return reply.status(200).send({ meal })
  }

  private parseParamRequestOrThrow(params: unknown): MealParamSchema {
    return findMealByIdParams.parse(params)
  }

  private async findMealById(mealDTO: MealParamSchema) {
    try {
      return this.performFindMealById(mealDTO)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async performFindMealById(mealDTO: MealParamSchema) {
    const getAllMealByUerUseCase = makeFindMealByIdUseCase()
    return getAllMealByUerUseCase.execute(mealDTO)
  }
}
