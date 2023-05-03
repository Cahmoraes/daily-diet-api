import { MealDTO } from '@/interfaces/MealDTO'
import { makeUpdateMealUseCase } from '@/use-cases/factories/meal/makeUpdateMealUseCase'
import { assert } from '@/utils/assert'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const editMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  hours: z.string(),
  inDiet: z.boolean(),
})
const userIdRequestSchema = z.string().uuid()
const mealIdParamSchema = z.object({
  mealId: z.string().uuid(),
})

type MealBodySchema = z.infer<typeof editMealBodySchema>
type UserIdRequestData = z.infer<typeof userIdRequestSchema>
type MealIdParamsData = z.infer<typeof mealIdParamSchema>
type UpdateMealParams = MealDTO & {
  mealId: string
}

export class UpdateMealController {
  private _reply?: FastifyReply

  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const userId = this.parseUserIdOrThrow(request.user.id)
    const mealBody = this.parseBodyRequestOrThrow(request.body)
    const { mealId } = this.parseMealIdParamOrThrow(request.params)
    this._reply = reply

    await this.createMeal({ userId, mealId, ...mealBody })
    return reply.status(204).send()
  }

  private parseMealIdParamOrThrow(params: unknown): MealIdParamsData {
    return mealIdParamSchema.parse(params)
  }

  private parseBodyRequestOrThrow(body: unknown): MealBodySchema {
    return editMealBodySchema.parse(body)
  }

  private parseUserIdOrThrow(params: unknown): UserIdRequestData {
    return userIdRequestSchema.parse(params)
  }

  private async createMeal(updateMealParams: UpdateMealParams) {
    try {
      await this.performCreateMeal(updateMealParams)
    } catch (error) {
      console.log(error)
      throw this.reply.send({ message: 'Meal does not exist.' })
    }
  }

  private async performCreateMeal(mealDTO: UpdateMealParams) {
    const createMealUseCase = makeUpdateMealUseCase()
    createMealUseCase.execute(mealDTO)
  }

  private get reply(): FastifyReply {
    assert(this._reply, 'Reply is undefined [CreateUserController]')
    return this._reply
  }

  private set reply(reply: FastifyReply) {
    this._reply = reply
  }
}
