import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUserFactory } from '@/use-cases/factories/user/makeAuthenticateUserFactory'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
})

type UserBodySchema = z.infer<typeof createUserBodySchema>

export class CreateUserController {
  private _request?: FastifyRequest
  private _reply?: FastifyReply

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
    const authenticate = makeAuthenticateUserFactory()
    await authenticate.execute({ ...userParams })
  }
}
