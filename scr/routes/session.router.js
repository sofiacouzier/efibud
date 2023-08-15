import { passportCall, createHash, validatePassword, generateToken } from "../services/auth.js";
import BaseRouter from "./Router.js";
import sessionController from "../controllers/session.controller.js";

export default class SessionRouter extends BaseRouter {
    init() {
        this.post('/register', ["NO_AUTH"], passportCall('register', { strategyType: "locals" }), async (req, res) => {
            res.sendSuccess("Registered")
        })//O AUTH-> solo entran los q no tienen usuario



        this.post('/login', ["NO_AUTH"], passportCall('login', { strategyType: "locals" }), sessionController.login)
        // this.post('/login', ["NO_AUTH"], passportCall('login', { strategyType: "locals" }), async (req, res) => {
        //     const accessToken = generateToken(req.user);
        //     //Envío desde una cookie:
        //     res.cookie('authToken', accessToken, {
        //         maxAge: 1000 * 60 * 60 * 24,
        //         httpOnly: true
        //     }).sendSuccess("logged in")
        // })

        this.post('/restorePassword', sessionController.restorePassword)
        // this.post('/restorePassword', async (req, res) => {
        //     const { email, password } = req.body;
        //     //¿El usuario sí existe?
        //     const user = await userModel.findOne({ email })
        //     if (!user) return res.sendInternalError(error = "User doesn't exist")
        //     const isSamePassword = await validatePassword(password, user.password);
        //     if (isSamePassword) return res.sendInternalError(error = "Cannot replace password with current password")
        //     //Ahora sí, actualizamos
        //     const newHashedPassword = await createHash(password);
        //     await userModel.updateOne({ email }, { $set: { password: newHashedPassword } });
        //     res.sendSuccess("password restored");
        // })

        this.get("/github", ["NO_AUTH"], passportCall("github", { strategyType: "jwt" }), (req, res) => { })


        this.get('/githubcallback', ["NO_AUTH"], passportCall("github", { strategyType: "jwt" }), sessionController.login)
        // this.get('/githubcallback', ["NO_AUTH"], passportCall("github", { strategyType: "jwt" }), (req, res) => {
        //     const accessToken = generateToken(req.user);
        //     //Envío desde una cookie:
        //     res.cookie('authToken', accessToken, {
        //         maxAge: 1000 * 60 * 60 * 24,
        //         httpOnly: true,
        //         sameSite: "strict"
        //     }).sendSuccess("logged in con github")
        // })

    }

}

//router.get('/github', passport.authenticate('github'), (req, res) => { });


// router.post('/restorePassword', async (req, res) => {
//     const { email, password } = req.body;
//     //¿El usuario sí existe?
//     const user = await userModel.findOne({ email })
//     if (!user) return res.status(400).send({ status: "error", error: "User doesn't exist" })
//     const isSamePassword = await validatePassword(password, user.password);
//     if (isSamePassword) return res.status(400).send({ status: "error", error: "Cannot replace password with current password" })
//     //Ahora sí, actualizamos
//     const newHashedPassword = await createHash(password);
//     await userModel.updateOne({ email }, { $set: { password: newHashedPassword } });
//     res.sendStatus(200);
// })
//export const router = Router();


// router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/registerFail' }), async (req, res) => {
//     res.send({ status: "success", message: "Registered" })

// })
// router.get('/registerFail', (req, res) => {
//     console.log(req.session.messages);
//     res.status(400).send({ status: "error", error: req.session.messages })
// })


// router.post('/login', passportCall('login', { redirect: '/api/sessions/loginFail' }), async (req, res) => {
//     const user = {
//         id: req.user.id,
//         name: req.user.name,
//         email: req.user.email,
//         role: req.user.role,
//     };
//     const accessToken = generateToken(user);
//     console.log(accessToken)

//     //Envío desde una cookie:
//     res.cookie('authToken', accessToken, {
//         maxAge: 1000 * 60 * 60 * 24,
//         httpOnly: true
//     }).sendStatus(200);

// })


// router.get('/jwtProfile', passportCall("jwt"), authToken, async (req, res) => {
//     //busta y chequea el token

//     console.log(req.user);
//     res.send({ status: "success", payload: req.user })
// })






//github:
//router.get('/github', passport.authenticate('github'), (req, res) => { });

// router.get('/githubcallback', passport.authenticate('github'), (req, res) => {
//     const user = {
//         id: req.user.id,
//         name: req.user.name,
//         email: req.user.email,
//         role: req.user.role,
//     };
//     const accessToken = generateToken(user);
//     //Aquí envío el token por el body, para que el front lo guarde
//     //   res.send({status:"success",accessToken})

//     //Envío desde una cookie:
//     res.cookie('authToken', accessToken, {
//         maxAge: 1000 * 60 * 60 * 24,
//         httpOnly: true,
//         sameSite: "strict"
//     }).sendStatus(200);
//     res.send({ status: "success", message: "Logueado, PERO CON GITHUB!!!!!" })
// })





// despues corregir
// router.get('/loginFail', (req, res) => {
//     res.redirect('/login')
// })





// router.post('/login', passport.authenticate('login', { failureRedirect: '/loginFail', failureMessage: true }), async (req, res) => {
//     req.session.user = {
//         name: req.user.name,
//         role: req.user.role,
//         id: req.user.id,
//         email: req.user.email
//     }
//     console.log(req.session.user)
//     return res.redirect('/');
// })







//router.post('/jwtLogin', async (req, res) => {

// const { email, password } = req.body;
// let accessToken;
// if (email === 'adminCoder@coder.com' && password === '123') {
//     const user = {
//         id: 0,
//         name: `Admin`,
//         role: 'admin',
//         email: '...',
//     };
//     // GENERO TOKEN
//     accessToken = generateToken(user);
//     return res.send({ status: "success", accessToken: accessToken })
// }
// let user;

// user = await userModel.findOne({ email });
// if (!user)
//     return res.sendStatus(400);
// const isValidPassword = await validatePassword(password, user.password);
// if (!isValidPassword) {

//     return res.sendStatus(400)
// }


// user = {
//     id: user._id,
//     name: `${user.first_name} ${user.last_name}`,
//     email: user.email,
//     role: user.role,
// };
// accessToken = generateToken(user);
// res.send({ status: "success", accessToken })
//})






