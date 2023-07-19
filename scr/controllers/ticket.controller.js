import cartModel from "../dao/mongo/models/cart.js";
import ticketModel from "../dao/mongo/models/ticket.js";

const createTicket = async (req, res) => {
    const { cid } = req.params
    const cart = await cartModel.findOne({ _id: cid }).lean().populate('products.product');
    const prodInCart = cart.products
    const code = Date.now() * Math.floor(Math.random() * 1000 + 1)
    let actualPrices = prodInCart.filter(prod => products.includes(prod.price))
    const totalPrice = actualPrices.reduce((accumulator, previous) => {
        accumulator += previous.price
    })
    const ticket = {
        products: prodInCart,
        code: code,
        purcheser: req.user.name,
        totalPrice

    }
    return ticketModel.createTicket(ticket)
}

export default {
    createTicket
}