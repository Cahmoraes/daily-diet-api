import { makeDeleteMealUseCase } from '@/use-cases/factories/meal/makeDeleteMealUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const deleteMealParam = z.object({
  mealId: z.string(),
})

type MealParamSchema = z.infer<typeof deleteMealParam>

export class DeleteMealController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const { mealId } = this.parseParamRequestOrThrow(request.params)
    await this.deleteMeal({ mealId })
    return reply.status(201).send()
  }

  private parseParamRequestOrThrow(params: unknown): MealParamSchema {
    return deleteMealParam.parse(params)
  }

  private async deleteMeal(mealDTO: MealParamSchema) {
    try {
      await this.performCreateMeal(mealDTO)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async performCreateMeal(mealDTO: MealParamSchema) {
    const createMealUseCase = makeDeleteMealUseCase()
    createMealUseCase.execute(mealDTO)
  }
}
