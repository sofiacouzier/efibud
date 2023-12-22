import { userService } from "../services/index.js";
import { generateToken } from "../services/auth.js";
import LoggerService from "../services/LoggerService.js";
import MailingService from "../services/MailingServices.js";
import DTemplates from "../constants/DTemplates.js";
import userModel from "../dao/mongo/models/users.js";
import mongoose from "mongoose";
const logger = new LoggerService("dev")




const getusers = async (req, res) => {
    const users = await userService.getUsers()
    console.log(users)
    return res.send(users);
}

export default {
    getusers
}