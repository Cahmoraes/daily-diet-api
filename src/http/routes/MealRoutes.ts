import { assert } from '@/utils/assert'
import { FastifyInstance } from 'fastify'
import { CreateMealController } from '../controllers/meal/CreateMealController'
import { UpdateMealController } from '../controllers/meal/UpdateMealController'
import { DeleteMealController } from '../controllers/meal/DeleteMealController'
import { FindMealByIdController } from '../controllers/meal/FindMealByIdController'
import { verifyJWT } from '../middlewares/verifyJWT'

export class MealRoutes {
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

  get app(): FastifyInstance {
    assert(this._app, 'FastifyInstance is undefined [MealRoutes]')
    return this._app
  }

  set app(app: FastifyInstance) {
    this._app = app
  }

  private registerRoutes(): void {
    this.registerCreateMeal()
    this.registerUpdateMeal()
    this.registerDeleteMeal()
    this.registerFindMealById()
  }

  private registerCreateMeal(): void {
    this.app.post(
      '/:userId',
      {
        onRequest: [verifyJWT],
      },
      new CreateMealController().execute,
    )
  }

  private registerUpdateMeal(): void {
    this.app.put(
      '/:mealId',
      {
        onRequest: [verifyJWT],
      },
      new UpdateMealController().execute,
    )
  }

  private registerDeleteMeal(): void {
    this.app.delete(
      '/:mealId',
      {
        onRequest: [verifyJWT],
      },
      new DeleteMealController().execute,
    )
  }

  private registerFindMealById(): void {
    this.app.get('/:mealId', new FindMealByIdController().execute)
  }
}
