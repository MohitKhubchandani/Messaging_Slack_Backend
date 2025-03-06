import { createMessageService } from "../services/messageService.js";
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED_EVENT } from "../utils/common/eventConstants.js";

// messageHandlers function is used to handle the event when a new message is created.
export default function messageSocketHandlers(io, socket){
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb){
    const { channelId } = data;
    const messageResponse = await createMessageService(data);
    // socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    if (typeof cb === 'function') {
      cb({
        success: true,
        message: 'Successfully created the message',
        data: messageResponse,
      });
    } else {
      console.log("No callback function provided (likely from Postman or another client)");
    }
  });
}


