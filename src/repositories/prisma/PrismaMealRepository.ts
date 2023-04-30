import { MealDTO } from '@/interfaces/MealDTO'
import { MealRepository, MealUpdateParams } from '../MealRepository'
import { prisma } from '@/lib/prisma'

export class PrismaMealRepository implements MealRepository {
  async update(params: MealUpdateParams): Promise<void> {
    await prisma.meal.update({
      where: {
        id: params.mealId,
      },
      data: {
        inDiet: params.inDiet,
        hours: params.hours,
        date: params.date,
        name: params.name,
        description: params.description,
      },
    })
  }

  async create(params: MealDTO): Promise<void> {
    await prisma.meal.create({
      data: {
        userId: params.userId,
        date: params.date,
        hours: params.hours,
        description: params.description,
        name: params.name,
        inDiet: params.inDiet,
      },
    })
  }
}
