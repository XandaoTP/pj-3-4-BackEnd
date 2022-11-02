require('dotenv').config()
import AdminJS from 'adminjs';
import AdminJsExpress from '@adminjs/express';
import  express  from 'express';
import sequelize from './db';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { Plataforms } from './src/models/plataform.entity';
import { Games } from './src/models/games.entity';
import { optionsResourceModel } from './src/utils/optionsResourceModel';
import { Users } from './src/models/user.entity';
import bcrypt from 'bcrypt'

const PORT = process.env.PORT_ENV;

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database
})

const run = async () =>{
    const admiJsOptions = {
        rootPath: '/admin',
        resources: [
            optionsResourceModel(Plataforms),
            optionsResourceModel(Games),
            optionsResourceModel(Users, {
                encryptedPassword: {
                    type: 'password',
                    IsVisible:{
                    list: false, edit: true, create: true, show: false
                        }
                    }    
                },
                {
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
            }),
        ],
        dashboard: {
            handle: () => {
                console.log('Bem vindo');
            },
            component: AdminJS.bundle('./src/components/dashboard')
        },
        branding:{
            companyName: 'Prejeto 3 e 4 Infnet',
            favicon:'https://i.pinimg.com/564x/b6/ef/c5/b6efc511ca3fe1d6bf920f43a1a14938.jpg',
            logo:'https://i.pinimg.com/564x/b6/ef/c5/b6efc511ca3fe1d6bf920f43a1a14938.jpg'
        }
    };

    const app = express();
    sequelize.sync()
        .then((result) => console.log(result))
        .catch((err) => console.log(err))


    const admin = new AdminJS(admiJsOptions);

    const adminRouter = AdminJsExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate: async function(email, password){
                const userLogin = await Users.findOne({
                    where:{
                        email: email
                    }
                });
                console.log(userLogin)
                if(userLogin){
                    const verifyPass = await bcrypt.compare(password, userLogin.encryptedPassword);
                    if(verifyPass){
                        return userLogin;
                    }
                }
                return false
            },
            cookieName: 'adminjs',
            cookiePassword: '0vXqcFO0rmJPxaMcg0mnlxw85818t2PP'     
        },
        null,
        )
     
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        console.log('Funfando');
    })
}
run();


