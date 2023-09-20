import { fastifyCors } from '@fastify/cors'
import { fastify } from "fastify"

import { addBill, getBills, updateBill, updateStatus, deleteBill } from './routes/bills'
import { getUserInfo } from './routes/user'

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(getBills)
app.register(addBill)
app.register(deleteBill)
app.register(updateBill)
app.register(updateStatus)

app.register(getUserInfo)

app.listen({
  port: 3333
}).then(() => {
  console.log('HTTP Server Running!')
})