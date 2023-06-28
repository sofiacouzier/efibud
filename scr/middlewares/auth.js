import { passportCall } from "../utils.js";

export const privacy = (privacyType) => {
    return passportCall("jwt"), (req, res, next) => {
        const user = req.user;
        switch (privacyType) {
            case "PRIVATE":
                //Esta validación es para dejar pasar a los que se hayan logueado.
                if (user) next();
                else {
                    console.log("no")
                    res.redirect('/login')
                }
                break;
            case "NO_AUTHENTICATED":
                if (!user) next()
                else res.redirect('/profile')
        }
    };
};

// necesito crear autorizacion segun roles:

export const authRoles = (role) => {
    return async (req, res, next) => {
        if (req.user.role != role) return res.status(403).send({ status: "error", error: "Fobidden" })
        next();
    }
}