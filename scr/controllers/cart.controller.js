import { cartService } from "../services/index.js";
import { productService } from "../services/index.js";
import shortid from "shortid";
import { ticketService } from "../services/index.js";


const getCartByID = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartService.getCartByID({ _id: cid }).lean()
    res.send(cart.products)
};


const showCart = async (req, res) => {
    const user = req.user
    const cid = user.user.cid
    const cart = await cartService.getCartByID({ _id: cid }).lean().populate('products.product');
    const prodInCart = cart.products
    const docs = prodInCart
    res.render('cart', {
        docs,
        css: 'home'
    })
}

const getCart = async (req, res) => {
    const cart = await cartService.getCart();
    res.send({ status: 'success', payload: cart })
}

const createCart = async (req, res) => {
    try {
        const c = {
            products: []
        };
        const result = await cartService.createCart(c)

        if (result.status === 'error') return res.status(400).send({ result });

        return res.status(200).send({ result });
    } catch (error) {
        req.logger.error(error)
    }
}

const addProd = async (req, res) => {
    const pid = req.body.prodId
    const cid = req.user.user.cid
    const quantity = 1
    try {
        const result = await cartService.addProductsToCart(cid, pid, quantity);
        res.sendStatus(200)
    } catch (error) {
        req.logger.error(error)
    }
}


const addProdBack = async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = req.body || 1
    try {
        const result = await cartService.addProductsToCart(cid, pid, quantity);
        res.sendStatus(201)
    } catch (error) {
        req.logger.error(error)
    }

}


const deleteCart = async (req, res) => {
    const { cid } = req.params
    const cart = await cartService.deleteCart({ _id: cid });
    return res.send({ status: 'success' })
}

const deleteProd = async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    const cart = await cartService.deleteProduct(cid, pid);
    return res.send({ status: 'success' })
}

const updateQ = async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    const { quantity } = req.body;
    const cart = await cartService.updateQuantity(cid, pid, quantity);
    return res.send({ status: 'success' })
}



const createTicket = async (req, res) => {

    try {
        const user = req.user
        const { cid } = req.params
        const cart = await cartService.getCartByID({ _id: cid }).lean().populate('products.product');
        console.log(cart)
        const prod = cart.products
        const ticketProd = []
        let prodLeft = []
        let acumulador = 0
        // console.log(prod)
        async function update(pid, updatedProduct) {
            const result = await productService.updateProduct(pid, updatedProduct)

        }
        async function cartupdate(cid, pid, newStock) {
            const response = await cartService.deleteProduct(cid, pid);

        }
        prod.forEach(p => {
            if (p.quantity <= p.product.stock) {
                let pid = p.product._id
                let newStock = p.product.stock - p.quantity
                let updatedProduct = { stock: newStock }
                //console.log(pid, newStock)
                try {
                    update(pid, updatedProduct)
                    cartupdate(cid, pid, newStock)
                } catch (error) {
                    console.log(error)
                }
                //si la cantidad es menor o coincide con el stock, agregar el producto al ticket
                ticketProd.push(p)
                const price = p.quantity * p.product.price
                acumulador = acumulador + price
            } else {
                prodLeft.push(p)
                console.log(`el producto ${p.product.title} no tiene suficiente stock`)
            }
        })
        //console.log(acumulador)
        //console.log(ticketProd)
        // Generar el código único
        const code = shortid.generate();
        const ticket = {
            user: user.user._id,
            code: code,
            amount: acumulador,
            purchaser: user.user.name,
            products: ticketProd
        }

        ticketService.createTicket(ticket)
        return res.send(prodLeft)
    } catch (error) {
        req.logger.error(error)
        return res.send({ status: 'error' })
    }
}

export default {
    getCartByID,
    getCart,
    createCart,
    addProd,
    deleteCart,
    deleteProd,
    updateQ,
    showCart,
    createTicket, addProdBack
};