import bcrypt from 'bcrypt'
import passport from 'passport';
import jwt from 'jsonwebtoken';


export const createHash = async (password) => {
    //Generar los Salts
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salts);
}
export const validatePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);


export const passportCall = (strategy, options = {}) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) return next(error);
            if (!options.strategyType) {
                console.log(`Route ${req.url} doesn't have defined a strategyType`);
                return res.status(400);
            }
            if (!user) {
                //¿Qué significa el que no haya encontrado user en cada caso?
                //Sin el strategyType,No encontrar usuario significa RECHAZAR DIRECTAMENTE
                switch (options.strategyType) {
                    case 'jwt':
                        req.error = info.message ? info.message : info.toString();
                        return next();
                    case 'locals':
                        return res.sendUnauthorized(info.message ? info.message : info.toString())
                }
                if (options.redirect) {

                    return res.redirect(options.redirect);
                }
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

export const generateToken = (user) => {
    const token = jwt.sign({ user }, 'jwtSecret', { expiresIn: '24h' });
    return token
}
