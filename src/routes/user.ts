import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export async function getUserInfo(app: FastifyInstance) {
  app.get('/info/:userId', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid()
    })

    const { userId } = paramsSchema.parse(req.params)

    let finalUser = {}

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    })

    const bills = await prisma.bill.findMany({
      where: {
        userId,
      }
    })
    
    const investments = await prisma.investment.findMany({
      where: {
        userId,
      }
    })

    console.log(investments)

    if (!user) return

    const billSum = bills.map(bill => bill.amount).reduce((acc, amount) => acc + amount, 0)
    const investmentSum = investments.reduce((acc, investment) => acc + investment.amount, 0)

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        expenses: billSum,
        invested: investmentSum,
        balance: user.income + investmentSum - billSum,
      }
    })

    finalUser = {
      ...user,
      bills,
      investments,
    }

    return finalUser
  })
}