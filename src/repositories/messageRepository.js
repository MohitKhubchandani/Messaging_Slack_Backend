import message from '../schema/message.js';
import crudRepository from './crudRepository.js';
// Message repository
const messageRepository = {
  ...crudRepository(message),
  
   // get paginated messages
    getPaginatedMessages: async function(messageParams, page, limit){
        const messages = await message.find(messageParams)
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('senderId', 'username email avatar')
     
        return messages;
    },

};

export default messageRepository;
