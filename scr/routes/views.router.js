import { Router } from "express";
//import ProductManager from "../dao/fileSystem/Managers/ProductManager.js";
//import ProductsManager from "../dao/mongo/Managers/products.js";
import productModel from "../dao/mongo/models/product.js";
import cartModel from "../dao/mongo/models/cart.js"
//import CartsManager from "../dao/mongo/Managers/carts.js";
import { authRoles, privacy } from "../middlewares/auth.js";
import { passportCall } from "../services/auth.js";
import { productService } from "../services/index.js";
//const pm = new ProductManager

const router = Router();
//const productsService = new ProductsManager();
//const cartsService = new CartsManager()
router.get('/', passportCall("jwt", { strategyType: "jwt" }), async (req, res) => {
    console.log(req.user)
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

})

router.get('/chat', async (req, res) => {
    res.render('chat')
})

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartModel.findOne({ _id: cid }).lean().populate('products.product');

    const docs = cart.products
    console.log(docs)
    res.render('cart', {
        docs
    })

})




router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts', {
        css: "realtimeproducts"
    });
})



router.get('/register', privacy('NO_AUTHENTICATED'), (req, res) => {
    res.render('register');
})

router.get('/login', privacy('NO_AUTHENTICATED'), (req, res) => {
    res.render('login')
})

router.get('/profile', passportCall("jwt", { redirect: "/login" }), (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
})
router.get('/restorePassword', privacy('NO_AUTHENTICATED'), (req, res) => {
    res.render('restorePassword')
})

router.get('/admin', passportCall('jwt', { redirect: '/login' }), authRoles('admin'), (req, res) => {
    console.log(req.user);
    res.render('jwtProfile', { user: req.user })

})


router.get('/jwtProfile', passportCall('jwt', { redirect: '/login' }), (req, res) => {
    res.render('jwtProfile', {
        user: req.user
    })

})


router.get('/jwtLogin', (req, res) => {
    res.render('login')

})

export default router;