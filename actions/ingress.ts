"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });
  console.log("ingresses: "+ingresses.length)
  const rooms = await roomService.listRooms([hostIdentity]);
  
  for (const room of rooms) {
    console.log("rooms: "+room.name)
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      console.log("ingress: "+ingress.name)
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  console.log("inside create ingress:" + ingressType)
  const self = await getSelf();
  console.log("self:" + self.username )
  console.log("inside create ingress:" + ingressType)
  await resetIngresses(self.id);
  console.log("after reset")
  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    };
  };
  console.log("before create ingress")
  console.log("ingress client: " + ingressClient.toString() )
  console.log("options " + options)
  const ingress = await ingressClient.createIngress(
    ingressType,
    options,
  );
  // console.log("ingress" + ingress)
  if (!ingress || !ingress.url || !ingress.streamKey) {
    console.log("inside if" + ingress)
    throw new Error("Failed to create ingress");
  }
  console.log("outside if" + ingress)

  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);
  return ingress;
};