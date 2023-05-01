import { PrismaClient } from '@prisma/client'
import '@/env'

const prisma = new PrismaClient()

export default async () => {
  await prisma.$transaction([
    prisma.meal.deleteMany(),
    prisma.user.deleteMany(),
  ])
}
