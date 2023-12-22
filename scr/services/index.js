import UsersManager from "../dao/mongo/Managers/users.js";
import UserService from "./repositories/user.service.js";
import PersistenceFactory from "../dao/Factory.js";

const userDao = await PersistenceFactory.getPersistence()

export const userService = new UserService(new UsersManager())