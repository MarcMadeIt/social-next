// /api/webhooks/clerk.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simpelt API-kald for at teste Prisma-forbindelse
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Prisma error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
