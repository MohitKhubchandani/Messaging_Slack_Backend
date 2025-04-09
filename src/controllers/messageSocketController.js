import { createMessageService } from "../services/messageService.js";
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED_EVENT } from "../utils/common/eventConstants.js";

// messageHandlers function is used to handle the event when a new message is created.
export default function messageSocketHandlers(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    try {
      console.log(data, typeof data);
      const { channelId } = data;

      const messageResponse = await createMessageService(data);  // ✅ await it

      console.log('Channel', channelId);

      io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);

      cb({
        success: true,
        message: 'Successfully created the message',
        data: messageResponse
      });
    } catch (error) {
      console.error("Error in message handler:", error);
      cb({
        success: false,
        message: "Failed to create message",
        error: error.message
      });
    }
  });
}



