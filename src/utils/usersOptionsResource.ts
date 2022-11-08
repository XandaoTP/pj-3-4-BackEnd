import bcrypt from 'bcrypt'
import UserController from '../controllers/user.controller'

const userOptions = {
     encryptedPassword: {
    type: 'password',
    isVisible:{
        list: false, edit: true, create: true, show: false
        }
    },
    active: {
        isVisible:{
            list: true, edit: false, create: false, show: true
        }    
    },
    pin: {
        isVisible:{
            list: false, edit: false, create: false, show: false

        }    
    },
}
const userControl = new UserController();
const userEncryptPass =  {
        new: {
            before: async function(request: any) {
                if(request.payload.encryptedPassword) {
                    request.payload.encryptedPassword = await bcrypt.hash(request.payload.encryptedPassword, 8)
                }
                //TODO: FAZER ENVIO DE E-MAIL AO CRIAR USUARIO
                request.payload.pin = '123456'
                userControl.sendPin(request.payload.pin, request.payload.email)
                return request
            }  
        },
        edit: {
            before: async function(request: any) {
                if(request.payload.encryptedPassword) {
                if(request.payload.encryptedPassword.indexOf('$2b$08') === -1) {
                    request.payload.encryptedPassword = await bcrypt.hash(request.payload.encryptedPassword, 8)
                }
            }
                return request
            }  
        }   
    }

export { userOptions , userEncryptPass }