import userModel from "../dao/mongo/models/users.js";
import { createHash, validatePassword, generateToken } from "../services/auth.js";



const restorePassword = async (req, res) => {
    const { email, password } = req.body;
    //¿El usuario sí existe?
    const user = await userModel.findOne({ email })
    if (!user) return res.sendInternalError(error = "User doesn't exist")
    const isSamePassword = await validatePassword(password, user.password);
    if (isSamePassword) return res.sendInternalError(error = "Cannot replace password with current password")
    //Ahora sí, actualizamos
    const newHashedPassword = await createHash(password);
    await userModel.updateOne({ email }, { $set: { password: newHashedPassword } });
    res.sendSuccess("password restored");
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
    restorePassword,
    login
}