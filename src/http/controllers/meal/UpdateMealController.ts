import { MealDTO } from '@/interfaces/MealDTO'
import { makeUpdateMealUseCase } from '@/use-cases/factories/makeUpdateMealUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const editMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  hours: z.string(),
  inDiet: z.boolean(),
})

const editMealParam = z.object({
  userId: z.string(),
  mealId: z.string(),
})

type MealBodySchema = z.infer<typeof editMealBodySchema>
type MealParamSchema = z.infer<typeof editMealParam>
type UpdateMealParams = MealDTO & {
  mealId: string
}

export class UpdateMealController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const mealBody = this.parseBodyRequestOrThrow(request.body)
    const { userId, mealId } = this.parseParamRequestOrThrow(request.params)
    await this.createMeal({ userId, mealId, ...mealBody })
    return reply.status(201).send()
  }

  private parseBodyRequestOrThrow(body: unknown): MealBodySchema {
    return editMealBodySchema.parse(body)
  }

  private parseParamRequestOrThrow(params: unknown): MealParamSchema {
    return editMealParam.parse(params)
  }

  private async createMeal(updateMealParams: UpdateMealParams) {
    try {
      await this.performCreateMeal(updateMealParams)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async performCreateMeal(mealDTO: UpdateMealParams) {
    const createMealUseCase = makeUpdateMealUseCase()
    createMealUseCase.execute(mealDTO)
  }
}
