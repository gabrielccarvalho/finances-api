import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';
import { calculateTotalInvestment } from '../utils/calculate-investment';

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

    if (!user) return

    const billSum = bills.map(bill => bill.amount).reduce((acc, amount) => acc + amount, 0)

    const accumulatedAmount = investments.reduce((acc, investment) => acc + investment.monthAmount + parseFloat(calculateTotalInvestment(
      investment.amount,
      investment.rentability,
      Math.ceil(Math.abs(new Date().getTime() - investment.date.getTime()) / (1000 * 3600 * 24)))), 0)

    const investmentMonthlySum = investments.reduce((acc, investment) => acc + investment.monthAmount, 0)

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        expenses: billSum + investmentMonthlySum,
        invested: accumulatedAmount,
        balance: user.income + accumulatedAmount - billSum,
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