import { makeDeleteMealUseCase } from '@/use-cases/factories/meal/makeDeleteMealUseCase'
import { assert } from '@/utils/assert'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const deleteMealParam = z.object({
  mealId: z.string(),
})

type MealParamSchema = z.infer<typeof deleteMealParam>

export class DeleteMealController {
  private _reply?: FastifyReply

  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const { mealId } = this.parseParamRequestOrThrow(request.params)
    this.reply = reply
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
      return this.reply.send({ message: 'Meal does not exist.' })
    }
  }

  private async performCreateMeal(mealDTO: MealParamSchema) {
    const createMealUseCase = makeDeleteMealUseCase()
    await createMealUseCase.execute(mealDTO)
  }

  private get reply(): FastifyReply {
    assert(this._reply, 'Reply is undefined [CreateUserController]')
    return this._reply
  }

  private set reply(reply: FastifyReply) {
    this._reply = reply
  }
}
