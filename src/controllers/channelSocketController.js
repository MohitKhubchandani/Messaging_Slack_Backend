
import { JOIN_CHANNEL } from "../utils/common/eventConstants.js"
//  join channel handler
export default function channelSocketHandlers(io, socket) {
  socket.on(JOIN_CHANNEL, function joinChannelHandler(data, cb) {
    const roomId = data.channelId;
    socket.join(roomId);
    console.log(`User ${socket.id} joined the channel: ${roomId}`);
    cb?.({
      success: true,
      message: 'Successfully joined the channel',
      data: roomId
    });
  });
}