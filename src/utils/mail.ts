export default class Mail {
    
    async sendEmail(to: string, subject: string, html: string){
        console.log(to)
        console.log(subject)
        console.log(html)
        console.log('####email######')
    }
}