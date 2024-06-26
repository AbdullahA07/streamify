"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/*/ui/alert";
import { Button } from "@/components/*/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/*/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/*/ui/select";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import { useState, useTransition, useRef, ElementRef } from "react";
import {createIngress} from "@/actions/ingress"
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {

    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);
    console.log("ingressType: " + parseInt(ingressType))
    const onSubmit = () => {
        console.log("inside submit")
        startTransition(() => {
            console.log("inside transition")
            createIngress(parseInt(ingressType))
            .then(() => { 
                toast.success("Ingress created")
                closeRef?.current?.click();
            })
            .catch(() => toast.error("Something went wrong"))
        })
    }
    return ( 
    <Dialog>
        <DialogTrigger>
            <Button variant="primary">
                Generate Connection
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
               <DialogTitle>Generate Connection</DialogTitle> 
            </DialogHeader>
            <Select value={ingressType}  onValueChange={(value) => setIngressType(value)}
                disabled={isPending}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder = "Ingress Type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={RTMP}>
                        RTMP
                    </SelectItem>
                    <SelectItem value={WHIP}>
                        WHIP
                    </SelectItem>
                </SelectContent>
            </Select>
            <Alert>
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle> Warning! </AlertTitle>
                <AlertDescription>This action will reset all active streams using the current connection</AlertDescription>
            </Alert>
            <div className="flex justify-between">
                <DialogClose ref={closeRef} asChild>
                    <Button variant="ghost">
                        Cancel
                    </Button>
                </DialogClose>
                <Button 
                    disabled = {isPending}
                    onClick={onSubmit}
                    variant="primary"
                >
                    Generate
                </Button>
            </div>
        </DialogContent>
    </Dialog>
        );
}
 
export default ConnectModal;