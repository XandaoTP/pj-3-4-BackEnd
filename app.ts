require('dotenv').config()
import AdminJS, { AppController } from 'adminjs';
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
        rootPath: '/home',
        resources: [
            optionsResourceModel(Plataforms),
            optionsResourceModel(Games),
            optionsResourceModel(Users, {
                encryptedPassword: {
                    IsVisible:{
                    list: false, edit: true, create: true, show: false
                        }
                    }    
                },
                {
                    new: {
                        before: async function(request: any) {
                            request.payload.encryptedPassword = await bcrypt.hash(request.payload.encryptedPassword,10)
                            return request
                        }  
                    },
                    edit: {
                        before: async function(request: any) {
                            console.log('salvando#######################################')
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

    const adminRouter = AdminJsExpress.buildRouter(admin)
     
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        console.log('Funfando');
    })
}
run();


