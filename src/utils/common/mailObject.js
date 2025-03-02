import { MAIL_ID } from "../../config/serverConfig.js";
// workspace join mail
export const workspaceJoinMail = function(workspace){
    return {
    from: MAIL_ID,
    subject: 'You have been added to workspace',
    text: `Congratulations! You have been added to the workspace ${workspace}`
    }
};