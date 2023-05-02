import '@fastify/jwt'

export module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      id: string
    }
  }
}
