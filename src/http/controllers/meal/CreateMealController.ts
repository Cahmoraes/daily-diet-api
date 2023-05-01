import { MealDTO } from '@/interfaces/MealDTO'
import { makeCreateMealUseCase } from '@/use-cases/factories/meal/makeCreateMealUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  hours: z.string(),
  inDiet: z.boolean(),
})

const createMealParam = z.object({
  userId: z.string(),
})

type MealBodySchema = z.infer<typeof createMealBodySchema>
type MealParamSchema = z.infer<typeof createMealParam>

export class CreateMealController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const mealBody = this.parseBodyRequestOrThrow(request.body)
    const { userId } = this.parseParamRequestOrThrow(request.params)

    // await request.jwtVerify()
    console.log(request.headers.authorization)

    console.log({ userId, mealBody })
    await this.createMeal({ userId, ...mealBody })

    return reply.status(201).send()
  }

  private parseBodyRequestOrThrow(body: unknown): MealBodySchema {
    return createMealBodySchema.parse(body)
  }

  private parseParamRequestOrThrow(params: unknown): MealParamSchema {
    return createMealParam.parse(params)
  }

  private async createMeal(mealDTO: MealDTO) {
    try {
      await this.performCreateMeal(mealDTO)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async performCreateMeal(mealDTO: MealDTO) {
    const createMealUseCase = makeCreateMealUseCase()
    createMealUseCase.execute(mealDTO)
  }
}
