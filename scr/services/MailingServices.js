import nodemailer from 'nodemailer'
import config from '../config/config.js'
import DMails from '../constants/DMails.js'
import { generateMailTemplate } from '../utils.js'

export default class MailingService {
    constructor() {
        this.mailer = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.mailer.USER,
                pass: config.mailer.PASSWORD
            }
        })
    }
    sendMail = async (emails, template, payload) => {
        const mailInfo = DMails[template];
        const html = await generateMailTemplate(template, payload);
        const result = await this.mailer.sendMail({
            from: 'Efibud matkorussovich@gmail.com',
            to: emails,
            html,
            ...mailInfo
        })
        return result;
    }
}