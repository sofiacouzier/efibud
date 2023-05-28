import { Router } from "express";
//import ProductManager from "../dao/fileSystem/Managers/ProductManager.js";
import ProductsManager from "../dao/mongo/Managers/products.js";
import productModel from "../dao/mongo/models/product.js";
//const pm = new ProductManager

const router = Router();
const productsService = new ProductsManager();

router.get('/', async (req, res) => {
    // const s = req.params
    const { lim = 10 } = Number(Object.values(req.body))
    const { page = 1 } = req.query;
    const { sort = 1 } = req.query;
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productModel.paginate({}, { page, limit: lim, sort, lean: true }, {
        sort: ({ price: - 1 })
    });

    // if (s) {
    //     if (s > 0) {

    //         const produ = docs.sort({ price: 1 })
    //         res.render('home', {
    //             produ,
    //             hasPrevPage, hasNextPage, prevPage, nextPage,
    //             page: rest.page,
    //             css: 'home'
    //         })


    //     } if (s < 0) {
    //         const produ = docs.sort({ price: 1 })
    //         res.render('home', {
    //             produ,
    //             hasPrevPage, hasNextPage, prevPage, nextPage,
    //             page: rest.page,
    //             css: 'home'
    //         })
    //     }
    // }

    const produ = docs
    res.render('home', {
        produ,
        hasPrevPage, hasNextPage, prevPage, nextPage,
        page: rest.page,
        css: 'home'
    })

})

router.get('/chat', async (req, res) => {
    res.render('chat')
})

router.get('/carts', async (req, res) => {
    res.render('carts')
})





router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts', {
        css: "realtimeproducts"
    });
})





export default router;