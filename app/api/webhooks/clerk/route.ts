import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Console } from "console";
import { db } from "@/lib/db";

export async function POST(req: Request)
{
    console.log("Inside POST")
    debugger;
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    if(!WEBHOOK_SECRET)
    {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to env or .env.local')
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timesamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if(!svix_id || !svix_timesamp || !svix_signature)
    {
        return new Response('Error Occured - headers not found', {status: 400})
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);   

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent
    try {
        evt = wh.verify(body, {
            "svix-id":svix_id,
            "svix-signature": svix_signature,
            "svix-timestamp": svix_timesamp
        }) as WebhookEvent
    } catch (error) {
        console.error('Error verifying webhook:', error );
        return new Response('Error Occured: ', {
            status: 400
        })    
    }

    const {id} = evt.data;
    const eventType = evt.type;
    console.log("eventType: " + eventType)
    if(eventType === 'user.created')
    {
        console.log("Payload:" + payload.data)
        await db.user.create(
            {
                data: {
                    externalUserId: payload.data.id,
                    username: payload.data.username,
                    imageUrl: payload.data.image_url,
                    stream: {
                        create: {
                            title: `${payload.data.username}'s Stream`
                        }
                    }
                }
            }
        )
    }
    if(eventType === 'user.updated')
    {
        const currentUser = await db.user.findUnique(
            {
                where: {
                    externalUserId: payload.data.id,
                }
            }
        )

        if(!currentUser)
        {
            return new Response('User not found', {status: 404})
        }

        await db.user.update(
            {
                where: {
                    externalUserId: payload.data.id
                },
                data: {
                    username : payload.data.username,
                    imageUrl: payload.data.image_url
                }
            }
        )
    }
    if(eventType === 'user.deleted')
    {
        await db.user.delete(
            {
                where: {
                    externalUserId: payload.data.id,
                }
            }
        )
    }

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log('Webhook body: ', body);

    return new Response('', { status : 200 })
}