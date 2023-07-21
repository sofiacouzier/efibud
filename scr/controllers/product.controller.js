
import productModel from "../dao/mongo/models/product.js";
import ProductService from "../services/repositories/product.service.js";

const showProducts = async (req, res) => {
    try {
        //console.log(req.user)
        const { sort = 1 } = req.query
        const { lim = 10 } = Number(Object.values(req.body))
        const { page = 1 } = req.query;

        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productModel.paginate({}, { page, limit: lim, lean: true, sort: { price: sort } });

        const produ = docs

        res.render('home', {
            produ,
            hasPrevPage, hasNextPage, prevPage, nextPage,
            page: rest.page,
            css: 'home',
            user: req.user
        })


    } catch (error) {
        console.log(error)
    }
}



const getProducts = async (req, res) => {
    const produ = await ProductService.getProducts();
    res.send({ status: 201, payload: produ })
}

const getProductByID = async (req, res) => {
    let id = Number(Object.values(req.params))
    const prod = await ProductService.getProductByID(id)
    if (!prod) res.status(404).send({ status: "error", error: "product not found" })
    return res.send({ status: 'success', payload: prod })
}

const addProducts = async (req, res) => {
    try {
        const product = req.body
        const result = await ProductService.addProducts(product)
        const everyProd = await ProductService.getProducts()
        if (result.status === 'error') return res.status(400).send({ result }); else {
            req.io.emit("entregando productos", everyProd)//envio los nuevos productos con el servidor que me paso desde el middleware
            return res.status(200).send({ result });
        }

    } catch (error) {
        console.log(error)
    }

}

const updateProduct = async (req, res) => {
    try {
        const updateProduct = req.body
        const id = Number(Object.values(req.params))
        const result = await ProductService.updateProduct(id, updateProduct)

        if (result.status === 'error') return res.status(400).send({ result });

        return res.status(200).send({ result });
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = Number(Object.values(req.params))
        const result = await ProductService.deleteProduct(id)
        const everyProd = await ProductService.getProducts()

        if (result.status === 'error') return res.status(400).send({ result });
        req.io.emit("entregando productos", everyProd)//envio los nuevos productos con el servidor que me paso desde el middleware

        return res.status(200).send({ message: "producto eliminado" });

    } catch (error) {
        console.log(error)
    }
}


const createProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) return res.status(400).send({ status: "error", error: "incomplete values" });

    const p = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };

    const result = await ProductService.createProduct(p);
    res.sendStatus(201)
}


export default {
    showProducts,
    getProducts,
    getProductByID,
    addProducts,
    updateProduct,
    deleteProduct,
    createProduct
};