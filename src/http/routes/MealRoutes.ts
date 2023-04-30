import { assert } from '@/utils/assert'
import { FastifyInstance } from 'fastify'
import { CreateMealController } from '../controllers/meal/CreateMealController'
import { EditMealController } from '../controllers/meal/EditMealController'

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

  private registerRoutes(): void {
    this.registerCreateMeal()
    this.registerEditMeal()
  }

  private registerCreateMeal(): void {
    this.app.post('/:userId', new CreateMealController().execute)
  }

  private registerEditMeal(): void {
    this.app.put('/:userId/:mealId', new EditMealController().execute)
  }

  get app(): FastifyInstance {
    assert(this._app, 'FastifyInstance is undefined [MealRoutes]')
    return this._app
  }

  set app(app: FastifyInstance) {
    this._app = app
  }
}
