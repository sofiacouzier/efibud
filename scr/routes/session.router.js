import { passportCall } from "../services/auth.js";
import BaseRouter from "./Router.js";
import sessionController from "../controllers/session.controller.js";

export default class SessionRouter extends BaseRouter {
    init() {
        this.post('/register', ["NO_AUTH"], passportCall('register', { strategyType: "locals" }), async (req, res) => {
            res.sendSuccess("Registered")
        })//O AUTH-> solo entran los q no tienen usuario

        this.post('/newPassword', ["NO_AUTH"], sessionController.newPassword)

        this.post('/login', ["NO_AUTH"], passportCall('login', { strategyType: "locals" }), sessionController.login)

        this.post('/restorePassword', ["NO_AUTH"], sessionController.restorePassword)

        this.get("/github", ["NO_AUTH"], passportCall("github", { strategyType: "jwt" }), (req, res) => { })

        this.get('/githubcallback', ["NO_AUTH"], passportCall("github", { strategyType: "jwt" }), sessionController.login)
    }

}
