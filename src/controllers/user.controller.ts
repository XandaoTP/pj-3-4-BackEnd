import { Users } from '../models/user.entity'


class UserController {
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
    }

export default UserController