import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/client'

export async function POST(req: Request) {
  console.log("Webhook received"); // Log when the request is received

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  console.log("Svix headers:", { svix_id, svix_timestamp, svix_signature });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  try {
    const payload = await req.json();
    console.log("Parsed payload:", payload); // Log parsed payload

    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;

    console.log("Webhook event:", evt);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const { id } = evt.data;
      const username = payload.data.username;

      // Ensure values exist
      console.log("Event ID and username:", { id, username });

      if (!id || !username) {
        throw new Error("ID or username is missing in the payload");
      }

      if (evt.type === "user.created") {
        await prisma.user.create({
          data: {
            id,
            username,
            avatar: payload.data.image_url || "/noavatar.png",
            cover: "/pawcover2.png",
          },
        });
      } else if (evt.type === "user.updated") {
        await prisma.user.update({
          where: { id },
          data: {
            username,
            avatar: payload.data.image_url || "/noavatar.png",
            cover: "/pawcover2.png",
          },
        });
      }
      return new Response("Success", { status: 200 });
    }
  } catch (error) {
    console.error("Error in webhook handler:", error); // Log detailed error
    return new Response('Error occurred', { status: 500 });
  }
}
