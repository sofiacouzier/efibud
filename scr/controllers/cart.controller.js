import cartModel from "../dao/mongo/models/cart.js";
import { cartService } from "../services/index.js";

const getCartByID = async (req, res) => {
    let id = Number(Object.values(req.params))
    //console.log(id)
    const cart = await cartService.getCartByID({ _id: id }).lean()
    // console.log(prod)

    res.send(cart.products)
};

const showCart = async (req, res) => {
    const user = req.user
    const cid = user.user.cid
    const cart = await cartService.getCartByID({ _id: cid }).lean().populate('products.product');
    const prodInCart = cart.products
    const docs = prodInCart
    console.log(docs)
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
        console.log(error)
    }
}

const addProd = async (req, res) => {
    console.log("llega")
    const user = req.user
    console.log(user)
    const cid = user.cid
    console.log(cid)
    // no llega asi!!
    let pid = Number(Object.values(req.params.pid))
    console.log(pid)
    let quantity = Number(Object.values(req.body)) || 1
    //console.log(quantity)
    const newCart = await cartService.addProductsToCart(cid, pid, quantity)
    //console.log(newCart)
    return res.status(200).send({ newCart });
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

export default {
    getCartByID,
    getCart,
    createCart,
    addProd,
    deleteCart,
    deleteProd,
    updateQ,
    showCart
};