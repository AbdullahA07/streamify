"use client"

import { Switch } from "@/components/*/ui/switch";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/*/ui/skeleton";

type FieldTypes= "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
    label: string,
    value: boolean,
    field: FieldTypes

}

export const ToggleCard = ({field, label, value = false}: ToggleCardProps) => {

    const [isPending, startTransition] = useTransition(); 
    const onChange = () =>{
        startTransition(() => {
            updateStream({[field]: !value})
            .then(() => toast.success("Chat setting updated"))
            .catch(() => toast.error("Something went wrong"))
        })
    }
    
    
    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-d">
                    {label}
                </p>
                <div className="space-y-2">
                    <Switch onCheckedChange={onChange} checked = {value} disabled={isPending}>
                        {value? "On" : "Off"}
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl p-10 w-full"/>
    )
}