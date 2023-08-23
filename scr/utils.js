import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import Handlebars from 'handlebars'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const generateMailTemplate = async (template, payload) => {
    const content = await fs.promises.readFile(`${__dirname}/templates/${template}.handlebars`, 'utf-8')
    const precompiledContent = Handlebars.compile(content);
    const compiledContent = precompiledContent({ ...payload })
    return compiledContent;
}

export const cookieExtractor = (req) => {
    let token = null; //Aquí va a venir el token... Si lo encuentra

    if (req && req.cookies) {
        token = req.cookies['authToken']
    }
    return token;
}



export default __dirname;