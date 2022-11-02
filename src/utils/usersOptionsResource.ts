import bcrypt from 'bcrypt'

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

const userEncryptPass =  {
        new: {
            before: async function(request: any) {
                if(request.payload.encryptedPassword) {
                    request.payload.encryptedPassword = await bcrypt.hash(request.payload.encryptedPassword, 8)
                }
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