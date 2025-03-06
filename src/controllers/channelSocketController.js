
import { JOIN_CHANNEL } from "../utils/common/eventConstants.js"

export default function channelSocketHandlers(io, socket) {

    socket.on(JOIN_CHANNEL, async function joinChannelHandler(data, cb) {
        const roomId = data.channelId;
        socket.join(roomId);
        if (typeof cb === 'function') {
            cb({
              success: true,
              message: 'Successfully created the message',
              data: roomId,
            });
          } else {
            console.log("No callback function provided (likely from Postman or another client)");
          }
        });
}
