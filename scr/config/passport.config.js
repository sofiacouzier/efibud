import passport from 'passport';
import local from 'passport-local';
import { cookieExtractor } from '../utils.js';
import { createHash, validatePassword } from '../services/auth.js';
import GithubStrategy from 'passport-github2';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { userService } from '../services/index.js';
import TokenDTO from '../dto/user/TokenDto.js';
import ErrorService from '../services/ErrorServices.js';
import { userErrorIncompleteValues } from '../constants/userError.js';
import EErors from '../constants/EErrors.js';
import config from './config.js';

const LocalStrategy = local.Strategy; // UNA ESTRATEGIA LOCAL SIEMPRE SE BASA EN EL USERNAME + PASSWORD

const initializePassportStrategies = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, email, password, done) => {
                try {
                    const { name } = req.body;


                    // el usuario ya existe?
                    const exists = await userService.getUserBy({ email });
                    if (exists)
                        return done(null, false, { message: 'El usuario ya existe' });
                    //no existe
                    //const hashedPassword = await createHash(password);
                    //Número 3! Construimos el usuario que voy a registrar
                    const c = {
                        products: []
                    };

                    const user = {
                        name,
                        email,
                        password
                        //password: hashedPassword,
                    };

                    const result = await userService.createUser(user);
                    //Si todo salió bien, Ahí es cuando done debe finalizar bien.
                    return done(null, result)
                } catch (error) {
                    req.logger.error(error)
                    if (!name || !email || !password) {
                        ErrorService.createError({
                            name: "error de creacion",
                            cause: userErrorIncompleteValues(name, email, password),
                            message: "error intentando registrar un usuario",
                            code: EErors.INCOMPLETE_VALUES
                        })
                    }
                    done(error);
                }
            }
        )
    );

    passport.use('login',
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                let resultUser;

                try {


                    //buscar al usuario
                    const user = await userService.getUserBy({ email });

                    if (!user) return done(null, false, { message: 'Credenciales incorrectas' });
                    //Número 2!!!! si sí existe el usuario, verificar password.


                    // const valid = await validatePassword(password, user.password)
                    //if (!valid)
                    if (user.password != password) {

                        return done(null, false, { message: 'Contraseña inválida' });
                    }
                    const id = user._id.toString()


                    resultUser = new TokenDTO(user)

                    return done(null, resultUser);


                } catch (error) {
                    req.logger.error(error)

                    if (!email || !password) {
                        ErrorService.createError({
                            name: "error de ingreso",
                            cause: userErrorIncompleteValues(email, password),
                            message: "error intentando loguear un usuario",
                            code: EErors.INCOMPLETE_VALUES
                        })
                    }

                    return done(error)
                }
            }

        ))
    //verifico token de manera mas prolija
    passport.use('jwt', new Strategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwt.SECRET,
    }, async (payload, done) => {
        try {

            return done(null, payload);
        } catch (error) {
            req.logger.warning(error)
            return done(error)
        }

    }))


}
export default initializePassportStrategies;