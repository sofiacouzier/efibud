import { Router } from "express";
import { passportCall } from "../services/auth.js";
import usersControllers from "../controllers/users.controllers.js";
import { authRoles } from "../middlewares/auth.js";
const router = Router();
//FUNCIONA
router.put('/premium', passportCall('jwt', { strategyType: 'jwt' }), usersControllers.changeRole)


router.get('/', passportCall('jwt', { strategyType: 'jwt' }), usersControllers.getusers)

router.delete('/', passportCall('jwt', { strategyType: 'jwt' }), authRoles("admin"), usersControllers.expired)


export default router;