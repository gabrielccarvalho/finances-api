import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export async function getBills(app: FastifyInstance) {
  app.get('/bills/:userId', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid()
    })

    const { userId } = paramsSchema.parse(req.params)

    const bills = await prisma.bill.findMany({
      where: {
        userId,
      }
    })

    return bills
  })
}

export async function addBill(app: FastifyInstance) {
  app.post('/bills/:userId', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid()
    })

    const bodySchema = z.object({
      name: z.string(),
      amount: z.number(),
      date: z.string(),
      status: z.number(),
    })

    const { userId } = paramsSchema.parse(req.params)

    const { name, amount, date, status } = bodySchema.parse(req.body)

    const bill = await prisma.bill.create({
      data: {
        name,
        amount,
        date,
        status,
        user: {
          connect: {
            id: userId,
          }
        }
      }
    })

    return bill
  })
}

export async function updateBill(app: FastifyInstance) {
  app.put('/bills/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const bodySchema = z.object({
      name: z.string(),
      amount: z.number(),
      date: z.string(),
      status: z.number(),
    })

    const { id } = paramsSchema.parse(req.params)

    const { name, amount, date, status } = bodySchema.parse(req.body)

    const bill = await prisma.bill.update({
      where: {
        id,
      },
      data: {
        name,
        amount,
        date,
        status,
      }
    })

    return bill
  })
}

export async function deleteBill(app: FastifyInstance) {
  app.delete('/bills/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(req.params)

    const bill = await prisma.bill.delete({
      where: {
        id,
      }
    })

    return bill
  })
}