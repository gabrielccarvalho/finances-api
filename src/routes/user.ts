import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export async function getUserInfo(app: FastifyInstance) {
  app.get('/info/:userId', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid()
    })

    const { userId } = paramsSchema.parse(req.params)

    const info = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    })

    return info
  })
}