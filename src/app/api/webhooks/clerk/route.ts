// src/app/api/webhooks/clerk/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import prisma from '@/lib/client';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  console.log("Webhook received");

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error('WEBHOOK_SECRET is not defined');
    return NextResponse.json({ message: 'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local' }, { status: 500 });
  }

  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ message: 'Missing Svix headers' }, { status: 400 });
  }

  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;

    const { id, data: { username, image_url } } = evt.data;

    if (!id || !username) {
      throw new Error("ID or username is missing in the payload");
    }

    if (evt.type === "user.created") {
      await prisma.user.create({
        data: {
          id,
          username,
          avatar: image_url || "/noavatar.png",
          cover: "/pawcover2.png",
        },
      });
    } else if (evt.type === "user.updated") {
      await prisma.user.update({
        where: { id },
        data: {
          username,
          avatar: image_url || "/noavatar.png",
          cover: "/pawcover2.png",
        },
      });
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    console.error("Error in webhook handler:", error);
    const errorMessage = error?.message || 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
