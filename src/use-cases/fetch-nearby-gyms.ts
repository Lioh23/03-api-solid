import { Gym } from '@prisma/client'
import { GymsRepository } from 'src/repositories/gyms-repository'

interface FectchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FectchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FectchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FectchNearbyGymsUseCaseRequest): Promise<FectchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
