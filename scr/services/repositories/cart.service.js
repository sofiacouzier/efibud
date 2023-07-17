export default class CartService {
    constructor(dao) {
        this.dao = dao;
    }

    getCart = () => {
        return this.dao.getCart();
    }
    getCartByID = (params) => {
        return this.dao.getCartByID(params)
    }
    createCart = (cart) => {
        return this.dao.createCart(cart);
    }
    deleteCart = (cart) => {
        return this.dao.deleteCart(cart);
    }
    addProducts = (cid, pid, quantity) => {
        return this.dao.addProductsToCart(cid, pid, quantity);
    }
    updateQuantity = (cid, pid, quantity) => {
        return this.dao.updateQuantity(cid, pid, quantity);
    }
    deleteProduct = (cid, pid) => {
        return this.dao.deleteProduct(cid, pid, quantity);
    }
}