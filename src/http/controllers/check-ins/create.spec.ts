import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticateUser } from '../../../use-cases/utils/test/create-and-authenticate-user'
import { prisma } from '../../../lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a Check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -22.535581,
        longitude: -44.2384228,
      },
    })

    const response = await request(app.server)
      .post(`/check-ins/${gym.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.535581,
        longitude: -44.2384228,
      })

    expect(response.statusCode).toEqual(201)
  })
})
