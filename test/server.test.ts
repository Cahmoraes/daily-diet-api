import { Server } from '@/Server'
import { test, beforeEach, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'

const app = new Server().getAppInstanceForTesting()

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

beforeEach(() => {
  execSync('npx prisma migrate dev')
})

test('test', async () => {
  await request(app.server)
    .post('/users')
    .send({
      name: 'caique moraes',
      email: 'caique@email.com',
    })
    .expect(201)
})
