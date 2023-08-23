import { messageService } from "../services/index.js";

const registerChatHandler = (io, socket) => {

    const saveMessage = async (message) => {
        await messageService.createMessage(message);
        const messageLogs = await messageService.getMessages();
        io.emit('chat:messageLogs', messageLogs);
    };
    const newParticipant = (user) => {
        socket.broadcast.emit('chat:newConnection')
    }

    socket.on('chat:message', saveMessage);
    socket.on("chat:newParticipant", newParticipant)

}

export default registerChatHandler;
