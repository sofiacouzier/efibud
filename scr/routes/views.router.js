import { Router } from "express";
import { authRoles, privacy } from "../middlewares/auth.js";
import { passportCall } from "../services/auth.js";
import productController from "../controllers/product.controller.js";
import { cartService } from "../services/index.js";

const router = Router();


router.get('/', passportCall("jwt", { strategyType: "jwt" }), productController.showProducts)



router.get('/chat', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), async (req, res) => {
    res.render('chat')
})
//capas?

router.get('/carts/:cid', (req, res) => {
    const { cid } = req.params
    const cart = cartService.getCartByID({ _id: cid }).populate('products.product')
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



router.get('/register', passportCall("jwt", { strategyType: "jwt" }), privacy('NO_AUTHENTICATED'), (req, res) => {
    res.render('register');
})

router.get('/login', passportCall("jwt", { strategyType: "jwt" }), privacy('NO_AUTHENTICATED'), (req, res) => {
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