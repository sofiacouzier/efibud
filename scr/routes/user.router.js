import { Router } from "express";
import { passportCall } from "../services/auth.js";
import usersControllers from "../controllers/users.controllers.js";
import { authRoles } from "../middlewares/auth.js";
const router = Router();
//FUNCIONA



router.get('/', passportCall('jwt', { strategyType: 'jwt' }), usersControllers.getusers)


export default router;