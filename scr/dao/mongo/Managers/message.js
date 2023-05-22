import messageModel from "../models/messages.js";


export default class MessageManager {

    getMessages = (params) => {
        return messageModel.find(params).lean()
    }

    createMessage = (message) => {
        return messageModel.create(message)
    }

}