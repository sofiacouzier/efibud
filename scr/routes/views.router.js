import { Router } from "express";
import { authRoles, privacy } from "../middlewares/auth.js";
import { passportCall } from "../services/auth.js";
import productController from "../controllers/product.controller.js";
import { cartService } from "../services/index.js";
import cartModel from "../dao/mongo/models/cart.js";
import cartController from "../controllers/cart.controller.js";
const router = Router();


router.get('/', passportCall("jwt", { strategyType: "jwt" }), productController.showProducts)



router.get('/chat', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), async (req, res) => {
    res.render('chat')
})
//capas?


router.get('/cart', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.showCart)





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

router.delete('/logout', async (req, res) => {
    console.log("eliminando sesion")
    res.clearCookie('authToken').send({ status: 200 });
})

router.get('/jwtLogin', (req, res) => {
    res.render('login')

})

export default router;