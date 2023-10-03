import { passportCall } from "../services/auth.js";

export const privacy = (privacyType) => {

    return passportCall("jwt", { strategyType: "jwt" }), (req, res, next) => {
        const user = req.user;
        switch (privacyType) {
            case "PRIVATE":
                //Esta validación es para dejar pasar a los que se hayan logueado.
                if (user) next();
                else {

                    res.redirect('/login')
                }
                break;
            case "NO_AUTHENTICATED":
                if (user) {

                    res.redirect('/')
                }
                if (!user) {

                    next()
                }

        }
    };
};

// necesito crear autorizacion segun roles:

export const authRoles = (roles) => {
    return async (req, res, next) => {
        const allowedRoles = roles.split(',').map(role => role.trim());
        if (!allowedRoles.includes(req.user.user.role)) return res.status(403).send({ status: "error", error: "Fobidden" })
        next();

    }
}