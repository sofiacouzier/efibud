import { productErrorIncompleteValues } from "../constants/productError.js";
import productModel from "../dao/mongo/models/product.js";
import { productService } from "../services/index.js";
import ErrorService from "../services/ErrorServices.js";
import LoggerService from "../services/LoggerService.js";
import { userService } from "../services/index.js";
import DTemplates from '../constants/DTemplates.js';
import MailingService from '../services/MailingServices.js';

const logger = new LoggerService("dev")


const showProducts = async (req, res) => {
    try {
        const { sort = 1 } = req.query
        const { lim = 9 } = Number(Object.values(req.body))
        const { page = 1 } = req.query;

        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productModel.paginate({}, { page, limit: lim, lean: true, sort: { price: sort } });
        //deberia no estar usando productMdol ---> revisar
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
    const produ = await productService.getProducts();
    res.send({ status: 200, payload: produ })
}

const getProductByID = async (req, res) => {
    const { pid } = req.params
    const prod = await productService.getProductsBy(pid)
    console.log(prod)
    if (!prod) res.status(404).send({ status: "error", error: "product not found" })
    return res.send({ status: 'success', payload: prod })
}

const addProducts = async (req, res) => {
    try {
        const product = req.body
        const result = await productService.addProducts(product)
        const everyProd = await productService.getProducts()
        if (result.status === 'error') return res.status(400).send({ result }); else {
            req.io.emit("entregando productos", everyProd)//envio los nuevos productos con el servidor que me paso desde el middleware
            return res.status(200).send({ result });
        }
    } catch (error) {
        req.logger.error(error)
    }
}


const updateProduct = async (req, res) => {
    try {
        const id = req.params.pid
        const prod = await productService.getProductsBy(id)
        const owner = prod.owner

        const userRole = req.user.user.role
        const product = req.body
        if (userRole === "admin" || owner === req.user.user.email) {
            const result = await productService.updateProduct(id, product)
            console.log(result)
            if (result.status === 'error') return res.status(400).send({ result });
            return res.status(200).send({ message: "product updated" });
        }


        return res.status(400).send({ message: "no auth" });

    } catch (error) {
        console.log(error)
        req.logger.error(error)
    }
}

const deleteProduct = async (req, res) => {


    try {
        const id = req.params.pid
        const prod = await productService.getProductsBy(id)
        const owner = prod.owner
        const userRole = req.user.user.role

        const ownersRole = await userService.getUserBy({ email: owner })
        console.log(ownersRole.role)

        if (userRole === "admin" || owner === req.user.user.email) {
            const result = await productService.deleteProduct(id)
            const everyProd = await productService.getProducts()


            if (ownersRole.role === "premium") {
                try {

                    const mailingService = new MailingService();
                    const mail = await mailingService.sendMail(owner, DTemplates.DELETED, { ownersRole, prod })
                } catch (error) {
                    console.log(error)
                }
            }

            if (result.status === 'error') return res.status(400).send({ result });
            req.io.emit("entregando productos", everyProd)//envio los nuevos productos con el servidor que me paso desde el middleware




            return res.status(200).send({ message: "producto eliminado" });

        }

        return res.status(400).send({ message: "no auth" });


    } catch (error) {
        console.log(error)
    }
}


const createProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        ErrorService.createError({
            name: "error de creacion",
            cause: productErrorIncompleteValues(title, description, price, thumbnail, code, stock),
            message: "error intentando loguear un usuario",
            code: EErors.INCOMPLETE_VALUES
        })
        return res.status(400).send({ status: "error", error: "incomplete values" });
    }
    if (req.user.user.role === "premium") {
        const owner = req.user.user.email
        const newProd = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            owner
        }
        const result = await productService.createProduct(newProd);

    } else {

        const newProd = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const result = await productService.createProduct(newProd);
    }

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