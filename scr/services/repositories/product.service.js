export default class ProductService {
    constructor(dao) {
        this.dao = dao;
    }

    showProducts = () => {
        return this.dao.showProducts()
    }
    getProducts = () => {
        return this.dao.getProducts();
    }
    getProductsBy = (params) => {
        return this.dao.getProductsByID(params)
    }
    createProduct = (cart) => {
        return this.dao.createProduct(cart);
    }
    deleteProduct = (prod) => {
        return this.dao.deleteProduct(prod);
    }
    updateProduct = (pid) => {
        return this.dao.updateProduct(pid);
    }
    addProducts = () => {
        return this.dao.addProducts()
    }

}