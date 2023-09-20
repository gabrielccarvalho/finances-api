import { fastifyCors } from '@fastify/cors'
import { fastify } from "fastify"

import { addBill, getBills, deleteBill } from './routes/bills'
import { getUserInfo, updateUserExpenses, updateUserBalance } from './routes/user'

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(getBills)
app.register(addBill)
app.register(deleteBill)

app.register(getUserInfo)
app.register(updateUserExpenses)
app.register(updateUserBalance)

app.listen({
  port: 3333
}).then(() => {
  console.log('HTTP Server Running!')
})