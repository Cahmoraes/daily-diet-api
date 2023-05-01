import { makeAuthenticateUserUseCase } from '@/use-cases/factories/user/makeAuthenticateUserUseCase'
import { assert } from '@/utils/assert'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createUserBodySchema = z.object({
  name: z.string(),
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
    console.log({ userParams })
    this.request = request
    this.reply = reply
    await this.authenticateUser(userParams)
    const token = await this.createJWT(userParams)
    return this.reply.status(201).send({ token })
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

  private async authenticateUser(userParams: UserBodySchema) {
    const authenticateUserUseCase = makeAuthenticateUserUseCase()
    try {
      await authenticateUserUseCase.execute(userParams)
    } catch (error) {
      this.reply.status(405).send({ message: 'User invalid' })
    }
  }

  private createJWT(userParams: UserBodySchema) {
    return this.reply.jwtSign(
      {},
      {
        sign: {
          sub: userParams.email,
        },
      },
    )
  }
}