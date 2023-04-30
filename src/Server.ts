import cookie from '@fastify/cookie'
import Fastify from 'fastify'
import { env } from './env'
import { UserRoutes } from './http/routes/UserRoutes'
import { MealRoutes } from './http/routes/MealRoutes'
import { ServerRoutes } from './http/routes/ServerRoutes'

export class ServerApp {
  private readonly app = Fastify({ logger: false })
  private readonly PORT = env.PORT
  private readonly HOST = '0.0.0.0'

  public start(): void {
    this.registerCookie()
    this.registerRoutes()
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
