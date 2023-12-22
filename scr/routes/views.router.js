import { Router } from "express";
import { authRoles, privacy } from "../middlewares/auth.js";
import { passportCall } from "../services/auth.js";
const router = Router();



router.get('/', passportCall("jwt", { strategyType: "jwt" }), (req, res) => {
    res.render('home', {
        user: req.user,
        css: 'estilo'
    })
})

router.get('/register', passportCall("jwt", { strategyType: "jwt" }), privacy('NO_AUTHENTICATED'), (req, res) => {
    res.render('register');
})

router.get('/login', passportCall("jwt", { strategyType: "jwt" }), privacy('NO_AUTHENTICATED'), (req, res) => {
    res.render('login',
        {
            css: 'estilo'
        })
})

router.get('/profile', passportCall("jwt", { redirect: "/login" }), (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
})
router.get('/restorePassword', privacy('NO_AUTHENTICATED'), (req, res) => {
    res.render('restorePassword',
        {
            css: 'estilo'
        })
})
router.get('/newPassword', privacy('NO_AUTHENTICATED'), (req, res) => {
    res.render('newPassword',
        {
            css: 'estilo'
        })
})

router.delete('/logout', async (req, res) => {
    console.log("eliminando sesion")
    res.clearCookie('authToken').send({ status: 200 });
})



export default router;