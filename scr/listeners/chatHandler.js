import MessageManager from "../dao/mongo/Managers/message.js";

const messagesServices = new MessageManager();

const registerChatHandler = (io, socket) => {

    const saveMessage = async (message) => {
        await messagesServices.createMessage(message);
        const messageLogs = await messagesServices.getMessages();
        io.emit('chat:messageLogs', messageLogs);
    };
    const newParticipant = (user) => {
        socket.broadcast.emit('chat:newConnection')
    }

    socket.on('chat:message', saveMessage);
    socket.on("chat:newParticipant", newParticipant)

}

export default registerChatHandler;
