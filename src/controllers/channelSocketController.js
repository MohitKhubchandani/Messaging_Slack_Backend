import { Socket } from "socket.io"

import { JOIN_CHANNEL } from "../utils/common/eventConstants"
export default function messageHandlers(io, socket) {
    Socket.on(JOIN_CHANNEL, async function joinChannelHandler(data, cb){
        const roomId = data.channelId;
        socket.join(roomId);
        cb({
            status: 'success',
            message: 'joined channel successfully',
            data: roomId,
        })
    })
}