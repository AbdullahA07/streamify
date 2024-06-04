"use client"

import { onBlock, onUnblock } from "@/actions/block"
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/*/ui/button"
import { isBlockedByUser } from "@/lib/block-service"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionProps {
    isFollowing: boolean,
    userId: string,
    isBlockedByUser: boolean,
}


export const Actions = ({ isFollowing, userId, isBlockedByUser }: ActionProps) => {

    const [isPending, startTransition] = useTransition();

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        });
    }

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        });
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow()
        }
        else {
            handleFollow()
        }
    }

    const onClickBlock = () => {
        if (isBlockedByUser) {
            handleBlock()
        }
        else {
            handleUnblock()
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
            .then((data) => toast.success(`Blocked the user ${data?.blocked.username}`))
            .catch(() => "Something went wrong")
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
            .then((data) => toast.success(`Unblocked the user ${data?.blocked.username}`))
            .catch(() => "Something went wrong")
        })
    }

    return (
        <>
            <Button disabled={isPending}
                onClick={onClick} variant="primary">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button onClick={handleUnblock} disabled={isPending}>
                Block
            </Button>
        </>
    )
}