import { fastify } from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { env } from '../src/env.ts'
import { sql } from './db/connection.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
// import { en } from 'zod/v4/locales'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: 'http://localhost:5173'
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
    return 'OK'
})

app.register(getRoomsRoute)

app.listen({ port: env.PORT }).then(() => {
    return 'Server is running!'
})