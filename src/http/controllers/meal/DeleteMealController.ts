import { makeDeleteMealUseCase } from '@/use-cases/factories/meal/makeDeleteMealUseCase'
import { assert } from '@/utils/assert'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const deleteMealParam = z.object({
  mealId: z.string(),
})
const userIdRequestSchema = z.string().uuid()

type UserIdRequestData = z.infer<typeof userIdRequestSchema>
type MealParamSchema = z.infer<typeof deleteMealParam>

interface DeleteMealParams extends MealParamSchema {
  userId: UserIdRequestData
}

export class DeleteMealController {
  private _reply?: FastifyReply

  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const userId = this.parseUserIdOrThrow(request.user.id)
    const { mealId } = this.parseParamRequestOrThrow(request.params)
    this.reply = reply
    await this.deleteMeal({ mealId, userId })
    return reply.status(200).send()
  }

  private parseParamRequestOrThrow(params: unknown): MealParamSchema {
    return deleteMealParam.parse(params)
  }

  private parseUserIdOrThrow(params: unknown): UserIdRequestData {
    return userIdRequestSchema.parse(params)
  }

  private async deleteMeal(mealDTO: DeleteMealParams) {
    try {
      await this.performCreateMeal(mealDTO)
    } catch (error) {
      console.log(error)
      return this.reply.send({ message: 'Meal does not exist.' })
    }
  }

  private async performCreateMeal(mealDTO: DeleteMealParams) {
    const createMealUseCase = makeDeleteMealUseCase()
    await createMealUseCase.execute(mealDTO)
  }

  private get reply(): FastifyReply {
    assert(this._reply, 'Reply is undefined [DeleteMealController]')
    return this._reply
  }

  private set reply(reply: FastifyReply) {
    this._reply = reply
  }
}
