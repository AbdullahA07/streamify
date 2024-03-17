"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    // TODO Adapt to disconnect from livestream
    //TODO Allow ability to kick the guest
    
    try{
        const blockedUser = await blockUser(id);
        
        revalidatePath("/");
        if(blockedUser)
        {
            revalidatePath(`/${blockedUser.blocked.username}`);
        }

        return blockedUser;
    } catch {
        throw new Error("Internal Error")
    }
}

export const onUnblock = async (id: string) => {
    try{
        const unblockedUser = await unblockUser(id);
        
        revalidatePath("/");
        if(unblockedUser)
        {
            revalidatePath(`/${unblockedUser.blocked.username}`);
        }

        return unblockedUser;
    } catch {
        throw new Error("Internal Error")
    }
}
