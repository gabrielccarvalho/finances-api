import { fastifyCors } from '@fastify/cors'
import { fastify } from "fastify"

import { getBills } from './routes/get-bills'
import { getUserInfo } from './routes/user'

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(getBills)
app.register(getUserInfo)

app.listen({
  port: 3333
}).then(() => {
  console.log('HTTP Server Running!')
})