import { MealDTO } from '@/interfaces/MealDTO'
import { MealRepository } from '../MealRepository'
import { prisma } from '@/lib/prisma'

export class PrismaMealRepository implements MealRepository {
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
