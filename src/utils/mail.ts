const nodeMailer = require('nodemailer')
require('dotenv').config()

export default class Mail {
    transporter: any;
    constructor(){
        this.transporter = nodeMailer.createTransport({
            port: process.env.PORT_EMAIL,
            host: process.env.EMAIL_HOST,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
            secure: true
        })
    }
    async sendEmail(to: string, subject: string, html: string): Promise<any>{
        console.log(to)
        console.log(subject)
        console.log(html)
        console.log('#####email#######')
        const data = {
            from: process.env.EMAIL,
            to,
            subject,
            html
        }
        try {
            return await this.transporter.sendMail(data)
        }catch (err){
            throw err;
        }
    }
}