import ticketModel from "../models/ticket.js";


//lsof -i tcp:8080               
export default class TicketsManager {

    getTicket = () => {
        return ticketModel.find().lean()
    }
    getTicketBy = (params) => {
        return ticketModel.findOne(params).lean()
    }
    createTicket = (ticket) => {
        return ticketModel.create(ticket)
    }
    updateTicket = (id, ticket) => {
        return ticketModel.findByIdAndUpdate(id, { $set: ticket })
    }
    deleteTicket = (id) => {
        return ticketModel.findByIdAndDelete(id)
    }
}


