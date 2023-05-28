import { GymsRepository } from 'src/repositories/gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'
import { FectchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: GymsRepository
let sut: FectchNearbyGymsUseCase

describe('Find Newarby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FectchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fech nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.535861,
      longitude: -44.225015,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -22.454592,
      longitude: -43.921176,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.5380375,
      userLongitude: -44.2494371,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
