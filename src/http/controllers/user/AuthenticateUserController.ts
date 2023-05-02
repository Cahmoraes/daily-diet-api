import { makeAuthenticateUserUseCase } from '@/use-cases/factories/user/makeAuthenticateUserUseCase'
import { assert } from '@/utils/assert'
import { User } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createUserBodySchema = z.object({
  name: z.string().min(3, 'Minimum 3 characters'),
  email: z.string(),
})

type UserBodySchema = z.infer<typeof createUserBodySchema>

export class AuthenticateUserController {
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
    this.request = request
    this.reply = reply

    const user = await this.authenticateUser(userParams)
    const token = await this.createJWT(user)

    return this.reply.status(200).send({ token })
  }

  private parseBodyRequestOrThrow(body: unknown): UserBodySchema {
    return createUserBodySchema.parse(body)
  }

  private get request(): FastifyRequest {
    assert(this._request, 'Request is undefined [CreateUserController]')
    return this._request
  }

  private set request(request: FastifyRequest) {
    this._request = request
  }

  private get reply(): FastifyReply {
    assert(this._reply, 'Reply is undefined [CreateUserController]')
    return this._reply
  }

  private set reply(reply: FastifyReply) {
    this._reply = reply
  }

  private async authenticateUser(userParams: UserBodySchema): Promise<User> {
    try {
      return this.performAuthenticateUser(userParams)
    } catch (error) {
      if (error instanceof Error) {
        this.reply.status(405).send({ message: error.message })
      }
      throw error
    }
  }

  private async performAuthenticateUser(
    userParams: UserBodySchema,
  ): Promise<User> {
    const authenticateUserUseCase = makeAuthenticateUserUseCase()
    const userOrNull = await authenticateUserUseCase.execute(userParams)
    if (!userOrNull) throw new Error('Invalid User')
    return userOrNull
  }

  private createJWT(user: User) {
    return this.reply.jwtSign(
      {
        id: user.id,
      },
      {
        sign: {
          sub: user.email,
        },
      },
    )
  }
}
