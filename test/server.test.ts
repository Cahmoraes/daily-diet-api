import { Server } from '@/Server'
import { it, beforeEach, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'

const app = new Server().getAppInstanceForTesting()

describe('Server tests Suite', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npx prisma migrate dev')
  })

  it('Deve criar um usuário', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@doe.com',
      })
      .expect(201)
  })

  it('Deve autenticar um usuário', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@doe.com',
      })
      .expect(201)

    await request(app.server)
      .post('/users/session')
      .send({
        name: 'John Doe',
        email: 'john@doe.com',
      })
      .expect(201)
  })

  // it('Deve criar uma refeição', async () => {
  //   await request(app.server)
  //     .post('/users')
  //     .send({
  //       name: 'John Doe',
  //       email: 'john@doe.com',
  //     })
  //     .expect(201)

  //   const authenticationResponse = await request(app.server)
  //     .post('/users/session')
  //     .send({
  //       name: 'John Doe',
  //       email: 'john@doe.com',
  //     })
  //     .expect(201)

  //   const token = authenticationResponse.body.token

  //   const responseCreateMeal = await request(app.server)
  //     .post('/meals/')
  //     .set('Authorization', 'Bearer ' + token)
  //     .send({
  //       name: 'Lasanha',
  //       description: 'deliciosa lasanha',
  //       date: '30/04/2023',
  //       hours: '20:14',
  //       inDiet: false,
  //     })
  //     .expect(201)
  // })
})
