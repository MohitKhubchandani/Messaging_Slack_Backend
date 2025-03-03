
import { JOIN_CHANNEL } from "../utils/common/eventConstants.js"

export default function channelSocketHandlers(io, socket) {
    socket.removeAllListeners(JOIN_CHANNEL);  // Prevent duplicate listeners

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
