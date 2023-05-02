import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUserUseCase } from '@/use-cases/factories/user/makeCreateUserUseCase'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
})

type UserBodySchema = z.infer<typeof createUserBodySchema>

export class CreateUserController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const userParams = this.parseBodyRequestOrThrow(request.body)
    await this.createUser(userParams)
    return reply.status(201).send()
  }

  private parseBodyRequestOrThrow(body: unknown): UserBodySchema {
    return createUserBodySchema.parse(body)
  }

  private async createUser(userParams: UserBodySchema): Promise<void> {
    try {
      await this.performCreateUser(userParams)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private async performCreateUser(userParams: UserBodySchema): Promise<void> {
    const authenticate = makeCreateUserUseCase()
    const user = await authenticate.execute({ ...userParams })
    console.log(user)
  }
}
