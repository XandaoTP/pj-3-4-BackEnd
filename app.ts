require('dotenv').config()
import AdminJS, { AppController } from 'adminjs';
import AdminJsExpress from '@adminjs/express';
import  express  from 'express';
import sequelize from './db';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { Plataforms } from './models/plataform.entity';
import { Games } from './models/games.entity';
import { optionsResourceModel } from './utils/optionsResourceModel';
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
            optionsResourceModel(Games)
        ],
        dashboard: {
            handle: () => {
                console.log('Bem vindo');
            },
            component: AdminJS.bundle('./components/dashboard')
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