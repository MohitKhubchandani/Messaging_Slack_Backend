
import { JOIN_CHANNEL } from "../utils/common/eventConstants.js"

export default function channelSocketHandlers(io, socket) {

    socket.on(JOIN_CHANNEL, async function joinChannelHandler(data, cb) {
        const roomId = data.channelId;
        socket.join(roomId);
        cb({
            status: 'success',
            message: 'Joined channel successfully',
            data: roomId,
        });
    });
}
