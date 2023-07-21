export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getTicket = () => {
        return this.dao.getTicket
    }
    getTicketBy = (params) => {
        return this.dao.getTicketBy(params)
    }
    createTicket = (ticket) => {
        return this.dao.createTicket(ticket)
    }
    updateTicket = (id, ticket) => {
        return this.dao.updateTicket(id, ticket)
    }
    deleteTicket = (id) => {
        return this.dao.deleteTicket
    }
}