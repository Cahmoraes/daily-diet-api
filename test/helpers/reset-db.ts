import { PrismaClient } from '@prisma/client'
import { env } from '@/env'

console.log('****')
console.log(env.NODE_ENV)

const prisma = new PrismaClient()

export default async () => {
  await prisma.$transaction([
    prisma.meal.deleteMany(),
    prisma.user.deleteMany(),
  ])
}
