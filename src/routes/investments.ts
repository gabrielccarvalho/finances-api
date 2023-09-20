import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export async function addInvestment(app: FastifyInstance) {
  app.post('/investments/:userId', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid()
    })

    const bodySchema = z.object({
      name: z.string(),
      amount: z.number(),
      date: z.string(),
      security: z.string(),
    })

    const { userId } = paramsSchema.parse(req.params)

    const { name, amount, date, security } = bodySchema.parse(req.body)

    const investment = await prisma.investment.create({
      data: {
        name,
        amount,
        date,
        security,
        user: {
          connect: {
            id: userId,
          }
        }
      }
    })

    const updatedInvestments = await prisma.investment.findMany({
      where: {
        userId: investment.userId,
      }
    })

    return updatedInvestments
  })
}

export async function deleteInvestment(app: FastifyInstance) {
  app.delete('/investments/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(req.params)

    const investment = await prisma.investment.delete({
      where: {
        id,
      }
    })

    const updatedInvestments = await prisma.investment.findMany({
      where: {
        userId: investment.userId,
      }
    })

    return updatedInvestments
  })
}