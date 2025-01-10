import '../processors/mailProcessor.js'

import mailQueue from "../queues/mailQueue.js"
export const addEmaiToMailQueue = async (emailData) => {
    console.log('initiating email sending process');
    
    try {
        await mailQueue.add(emailData);
        console.log('Email added to mail queue');
    } catch (error) {
        console.log('Add mail to mail queue error', error);
        
    }
}