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
        return this.dao.getProductsBy(params)
    }
    createProduct = (cart) => {
        return this.dao.createProduct(cart);
    }
    deleteProduct = (prod) => {
        return this.dao.deleteProduct(prod);
    }
    updateProduct = (pid, product) => {
        return this.dao.updateProduct(pid, product);
    }
    addProducts = () => {
        return this.dao.addProducts()
    }

}