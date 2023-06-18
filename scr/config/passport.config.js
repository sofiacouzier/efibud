import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/mongo/models/users.js';
import { createHash, validatePassword } from '../utils.js';
import GithubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy; // UNA ESTRATEGIA LOCAL SIEMPRE SE BASA EN EL USERNAME + PASSWORD

const initializePassportStrategies = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, email, password, done) => {
                try {
                    const { first_name, last_name } = req.body;
                    // el usuario ya existe?
                    const exists = await userModel.findOne({ email });
                    if (exists)
                        return done(null, false, { message: 'El usuario ya existe' });
                    //no existe
                    const hashedPassword = await createHash(password);
                    //Número 3! Construimos el usuario que voy a registrar
                    const user = {
                        first_name,
                        last_name,
                        email,
                        password: hashedPassword,
                    };
                    const result = await userModel.create(user);
                    //Si todo salió bien, Ahí es cuando done debe finalizar bien.
                    done(null, result);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use('login',
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {

                if (email === "adminCoder@coder.com" && password === "123") {
                    const user = {
                        id: 0,
                        name: `Admin`,
                        email: "mail",
                        role: 'admin',
                    }
                    return done(null, user);
                }
                let user;
                //buscar al usuario
                user = await userModel.findOne({ email });
                if (!user) return done(null, false, { message: 'Credenciales incorrectas' });


                //Número 2!!!! si sí existe el usuario, verificar password.

                const valid = await validatePassword(password, user.password)
                if (!valid) return done(null, false, { message: 'Contraseña inválida' });


                user = {
                    id: user._id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    role: user.role,
                }

                return done(null, user);
            }

        ))
    passport.use('github',
        new GithubStrategy(
            {
                clientID: 'Iv1.34b35ad96487fcab',
                clientSecret: 'e668e0195c60394abfb251de2e0a496137baea85',
                callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log(profile);
                    //Tomo los datos que me sirvan.
                    const { name, email } = profile._json;
                    const user = await userModel.findOne({ email });
                    //DEBO GESTIONAR AMBAS LÓGICAS AQUÍ, OMG!!!
                    if (!user) {
                        //No existe? lo creo entonces.
                        const newUser = {
                            first_name: name,
                            email,
                            password: ''
                        }
                        const result = await userModel.create(newUser);
                        done(null, result);
                    }
                    //Si el usuario ya existía, Qué mejor!!! 
                    done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        ))

    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    });
    passport.deserializeUser(async function (id, done) {
        if (id === 0) {
            return done(null, {
                role: "admin",
                name: "ADMIN"
            })
        }
        const user = await userModel.findOne({ _id: id });
        return done(null, user);
    });


}
export default initializePassportStrategies;