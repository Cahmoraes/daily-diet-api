import { assert } from '@/utils/assert'
import { randomUUID } from 'node:crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUserUseCase } from '@/use-cases/factories/user/makeCreateUserUseCase'

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
    this.request = request
    this.reply = reply
    await this.createUser(userParams)
    return this.reply.status(201).send()
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

  private createSessionIdCookieIfNotExists(): string {
    return this.hasSessionIdCookie()
      ? this.sessionIdCookie
      : this.createSessionIdCookie()
  }

  private hasSessionIdCookie(): boolean {
    return Boolean(this.request.cookies.sessionId)
  }

  private get sessionIdCookie(): string {
    assert(this.request.cookies.sessionId, 'SessionIdCookie is undefined')
    return this.request.cookies.sessionId
  }

  private createSessionIdCookie(): string {
    const sessionId = randomUUID()
    this.reply.setCookie('sessionId', sessionId)
    return sessionId
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
    const createUserUseCase = makeCreateUserUseCase()
    await createUserUseCase.execute({
      ...userParams,
      sessionId: this.createSessionIdCookieIfNotExists(),
    })
  }
}
