import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticateUser } from '../../../use-cases/utils/test/create-and-authenticate-user'
import { prisma } from '../../../lib/prisma'

describe('History Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -22.535581,
        longitude: -44.2384228,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      checkIns: [
        expect.objectContaining({
          gym_id: gym.id,
          user_id: user.id,
        }),
        expect.objectContaining({
          gym_id: gym.id,
          user_id: user.id,
        }),
      ],
    })
  })
})
