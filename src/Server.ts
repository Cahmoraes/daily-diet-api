import cookie from '@fastify/cookie'
import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { env } from './env'
import { UserRoutes } from './http/routes/UserRoutes'
import { MealRoutes } from './http/routes/MealRoutes'
import { ServerRoutes } from './http/routes/ServerRoutes'
import { ZodError } from 'zod'

export class ServerApp {
  private readonly app = Fastify({ logger: false })
  private readonly PORT = env.PORT
  private readonly HOST = '0.0.0.0'

  public start(): void {
    this.registerCookie()
    this.registerRoutes()
    this.registerErrorHandler()
    this.listen()
  }

  private registerCookie(): void {
    this.app.register(cookie)
  }

  private async registerRoutes(): Promise<void> {
    this.app.register(new UserRoutes().initialize, {
      prefix: ServerRoutes.USERS,
    })

    this.app.register(new MealRoutes().initialize, {
      prefix: ServerRoutes.MEALS,
    })
  }

  private registerErrorHandler(): void {
    this.app.setErrorHandler(this.performErrorHandler.bind(this))
  }

  private performErrorHandler(
    error: FastifyError,
    _: FastifyRequest,
    reply: FastifyReply,
  ) {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error', issues: error.format() })
    }
    console.log('error handler')
    console.log(error.message)
    return reply.status(500).send({ message: 'Internal server error.' })
  }

  private async listen(): Promise<void> {
    try {
      await this.performListen()
    } catch (error) {
      this.app.log.error(error)
    }
  }

  private async performListen(): Promise<void> {
    await this.app.listen({
      port: this.PORT,
      host: this.HOST,
    })
    console.log(`HTTP Server Running ON ${this.PORT} 🚀`)
  }
}
