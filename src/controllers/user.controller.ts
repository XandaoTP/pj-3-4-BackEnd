import { Users } from '../models/user.entity'
import Mail from '../utils/mail';

class UserController{
    mail: Mail;
    constructor(){
        this.mail = new Mail()
    }
    public async confirmEmail(pin: string): Promise<any>{
        let result = {
            statusCode: 200,
            msg: ''
        }
        try{
        const user = await Users.findOne({
            where: {
                pin
            }
        })
        if(user){
            await Users.update({active: 1, pin: ''}, {
              where: {
                pin
              }  
            });
            result['msg'] = 'Email Verificado.'
        }else {
            result['msg'] = 'Pin invalido. Digite corretamente.'    
            result['statusCode'] = 400    
        }
        }catch (err) {
            result['msg'] = 'Algo deu errado. Tente novamente.'
            result['statusCode'] = 400
        }
        return result       
    }
    public async sendPin(pin: string, email: string): Promise<void>{
        console.log(pin)
        console.log(email)
        this.mail.sendEmail(email, 'confirme email', 'html envio email.')
    }
}

export default UserController