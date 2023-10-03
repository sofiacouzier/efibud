import { passportCall } from "../services/auth.js";
import BaseRouter from "./Router.js";
import sessionController from "../controllers/session.controller.js";


export default class SessionRouter extends BaseRouter {
    init() {
        //FUNCIONA
        this.post('/register', ["NO_AUTH"], passportCall('register', { strategyType: "locals" }), async (req, res) => {
            res.sendSuccess("Registered")
        })//O AUTH-> solo entran los q no tienen usuario
        //FUNCIONA
        this.post('/newPassword', ["NO_AUTH"], sessionController.newPassword)


        //FUNCIONA
        this.post('/login', ["NO_AUTH"], passportCall('login', { strategyType: "locals" }), sessionController.login)
        //FUNCIONA
        this.post('/restorePassword', ["NO_AUTH"], sessionController.restorePassword)

        //ni idea si anda, ya fue
        this.get("/github", ["NO_AUTH"], passportCall("github", { strategyType: "jwt" }), (req, res) => { })

        this.get('/githubcallback', ["NO_AUTH"], passportCall("github", { strategyType: "jwt" }), sessionController.login)
    }

}
