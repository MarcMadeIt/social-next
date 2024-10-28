// src/app/api/webhooks/clerk/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/client';

export async function POST(req: NextRequest) {
  try {
    // Eksempel på Prisma-kald for at teste forbindelsen
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
