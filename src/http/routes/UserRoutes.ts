import { assert } from '@/utils/assert'
import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../controllers/user/CreateUserController'

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
    this.registerCreateUser()
  }

  private get app(): FastifyInstance {
    assert(this._app, 'app is not a FastifyInstance [UserRoutes]')
    return this._app
  }

  private set app(app: FastifyInstance) {
    this._app = app
  }

  private registerCreateUser() {
    this.app.post('/', new CreateUserController().execute)
  }
}
