import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export async function getUserInfo(app: FastifyInstance) {
  app.get('/info/:userId', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid()
    })

    const { userId } = paramsSchema.parse(req.params)

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    })

    return user
  })
}

export async function updateUserExpenses(app: FastifyInstance) {
  app.post('/expenses/:userId', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid()
    })

    const bodySchema = z.object({
      expenses: z.number()
    })

    const { userId } = paramsSchema.parse(req.params)

    const { expenses } = bodySchema.parse(req.body)

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        expenses,
      }
    })

    return user
  })
}

export async function updateUserBalance(app: FastifyInstance) {
  app.post('/balance/:userId', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid()
    })

    const bodySchema = z.object({
      balance: z.number()
    })

    const { userId } = paramsSchema.parse(req.params)

    const { balance } = bodySchema.parse(req.body)

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance,
      }
    })

    return user
  })
}