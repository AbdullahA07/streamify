"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { Stream } from "@prisma/client"
import { getSelf } from "@/lib/auth-service"
import { getStreamByUserId } from "@/lib/stream-service"
import { SelfDecodingBody } from "svix/dist/openapi"


export const updateStream = async (values: Partial<Stream>) => {

    try{
        const self = await getSelf();
        const selfStream = await db.stream.findUnique({
            where: {
                userId: self.id
            }
        })
        
        if(!selfStream)
        {
            throw new Error("Stream not found")
        }

        const validateData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed
        }

        const stream = await db.stream.update({
            where: {
                id: selfStream.id
            },
            data: {
                ...validateData
            }
        })

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)

        return stream;
    }catch{ 
        throw new Error("Internal Error")
    }



}