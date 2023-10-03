import { userService } from "../services/index.js";
import { generateToken } from "../services/auth.js";
import LoggerService from "../services/LoggerService.js";
import MailingService from "../services/MailingServices.js";
import DTemplates from "../constants/DTemplates.js";
const logger = new LoggerService("dev")


const changeRole = async (req, res) => {
    const { role } = req.body;
    if (!role) {

        return res.status(400).send({ status: "error", error: "incomplete values" });
    }
    if (role === req.user.user.role) {
        return res.status(400).send({ status: "error", error: "cant change to previous role" });
    } else {
        const user = req.user.user

        await userService.updateUser(user.id, { role: role });


        const updateduser = {
            name: user.name,
            role: role,
            id: user.id,
            email: user.email,
            cid: user.cid
        }
        const token = generateToken(updateduser);

        return res.cookie('authToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24,
        }).sendStatus(200)
    }

}
const expired = async (req, res) => {
    const users = await userService.getExpiredUsers()

    users.forEach(user => {
        if (user.last_connection > user.last_connection.getDate() + 2) {

            userService.deleteUser(user._id.toString())
            try {

                const mailingService = new MailingService();
                const mail = mailingService.sendMail(user.email, DTemplates.EXPIRED, { user })
                console.log("hola")

            } catch (error) {
                console.log(error)
            }
        }
    });
    return res.status(200).send(users);
}


const getusers = async (req, res) => {
    const users = await userService.getUsers()
    console.log(users)
    return res.status(200).send(users);
}

export default {
    changeRole,
    getusers,
    expired
}