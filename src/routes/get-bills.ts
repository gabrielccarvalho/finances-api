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