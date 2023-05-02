import { assert } from '@/utils/assert'
import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../controllers/user/CreateUserController'
import { GetAllMealByUserController } from '../controllers/meal/GetAllMealByUserController'
import { AuthenticateUserController } from '../controllers/user/AuthenticateUserController'
import { verifyJWT } from '../middlewares/verifyJWT'

export class UserRoutes {
  private _app?: FastifyInstance

  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.initialize = this.initialize.bind(this)
  }

  public async initialize(app: FastifyInstance) {
    this.app = app
    this.registerRoutes()
  }

  private get app(): FastifyInstance {
    assert(this._app, 'app is not a FastifyInstance [UserRoutes]')
    return this._app
  }

  private set app(app: FastifyInstance) {
    this._app = app
  }

  private registerRoutes(): void {
    this.registerCreateUser()
    this.registerGetAllMealByUser()
    this.registerAuthenticateUser()
  }

  private registerCreateUser() {
    this.app.post('/', new CreateUserController().execute)
  }

  private registerGetAllMealByUser(): void {
    this.app.get(
      '/meals',
      {
        onRequest: [verifyJWT],
      },
      new GetAllMealByUserController().execute,
    )
  }

  private registerAuthenticateUser(): void {
    this.app.post('/session', new AuthenticateUserController().execute)
  }
}
