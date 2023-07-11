import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);





export const cookieExtractor = (req) => {
    let token = null; //Aquí va a venir el token... Si lo encuentra
    console.log(req.session.cookie)
    if (req && req.cookies) {
        token = req.cookies['authToken']
    }
    console.log(token)
    return token;
}



export default __dirname;