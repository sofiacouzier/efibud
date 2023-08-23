import { createHash, validatePassword, generateToken } from "../services/auth.js";
import { userService } from "../services/index.js";
import DTemplates from '../constants/DTemplates.js';
import RestoreTokenDTO from '../dto/user/RestoreTokenDTO.js';
import MailingService from '../services/MailingServices.js';
import config from '../config/config.js'
import jwt from 'jsonwebtoken';





const restorePassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.sendInternalError(error = "no email")
    console.log(email)
    //¿El usuario sí existe?
    const user = await userService.getUserBy({ email: email })
    if (!user) return res.sendInternalError(error = "User doesn't exist")

    const restoreToken = generateToken(RestoreTokenDTO.getFrom(user), '1h');
    //Guardar el Token en mi WhiteList
    try {
        const mailingService = new MailingService();
        const result = await mailingService.sendMail(user.email, DTemplates.RESTORE, { restoreToken })
    } catch (error) {
        console.log(error)
    }

    res.sendSuccess("password restored");
}


const newPassword = async (req, res) => {
    console.log(req.body)
    const { password, token } = req.body
    console.log(password)
    try {
        const tokenUser = jwt.verify(token, config.jwt.SECRET);
        const Temail = tokenUser.user.email
        const user = await await userService.getUserBy({ email: Temail });
        console.log(user)
        //Verificar que la contraseña no sea la misma que ya tenemos
        const isSamePassword = await validatePassword(password, user.password);
        if (isSamePassword) return res.sendInternalError('Cannot replace password with current password')
        const newHashedPassword = await createHash(password);
        await userService.update(user._id, { password: newHashedPassword });
        //Aquí borras el token del whitelist
        res.sendSuccess("Contraseña Cambiada");
    } catch (error) {
        console.log(error);
    }

}


const login = async (req, res) => {
    const accessToken = generateToken(req.user);
    //Envío desde una cookie:
    res.cookie('authToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }).sendSuccess("logged in")
}


export default {
    newPassword,
    restorePassword,
    login
}