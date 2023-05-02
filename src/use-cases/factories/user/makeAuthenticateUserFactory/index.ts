import { makeAuthenticateUserInMemoryUseCase } from '../makeAuthenticateUserInMemoryUseCase'
import { makeAuthenticateUserUseCase } from '../makeAuthenticateUserUseCase'

export function makeAuthenticateUserFactory(DB?: string) {
  switch (DB) {
    case 'IN_MEMORY':
      return makeAuthenticateUserInMemoryUseCase()
    default:
      return makeAuthenticateUserUseCase()
  }
}
