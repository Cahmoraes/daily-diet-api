import { Meal } from '@prisma/client'
import { MealDTO } from '@/interfaces/MealDTO'
import {
  DeleteMealParams,
  GetAllMealByUserParams,
  MealRepository,
  UpdateMealParams,
} from '../MealRepository'
import { prisma } from '@/lib/prisma'

export class PrismaMealRepository implements MealRepository {
  async getAllByUser(params: GetAllMealByUserParams): Promise<Meal[]> {
    return prisma.meal.findMany({
      where: {
        userId: params.userId,
      },
    })
  }

  async delete(params: DeleteMealParams): Promise<void> {
    await prisma.meal.delete({
      where: {
        id: params.mealId,
      },
    })
  }

  async update(params: UpdateMealParams): Promise<void> {
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
