import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) res.status(400).send({ status: error, error: "not auth" })
    const token = authHeader.split(" ")[1];
    jwt.verify(token, 'jwtSecret', (error, credentials) => {
        if (error) return res.status(400).send({ error: "token invalido" })
        req.user = credentials.user;
        next()
    })
}