require('dotenv').config()
import AdminJS from 'adminjs';
import AdminJsExpress from '@adminjs/express';
import  express  from 'express';
import { sequelize, mongodb } from './db';
import * as AdminJSSequelize from '@adminjs/sequelize';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { Plataforms } from './src/models/plataform.entity';
import { Games } from './src/models/games.entity';
import { optionsResourceModel } from './src/utils/optionsResourceModel';
import { Users } from './src/models/user.entity';
import bcrypt from 'bcrypt'
import session from 'express-session' 
import options from './src/utils/optionsMySqlSession';
import auth from './src/routes/auth';
import hbs from 'hbs';
import path from 'node:path' 
import { userEncryptPass, userOptions } from './src/utils/usersOptionsResource';
import bodyParser from 'body-parser'
import UserController from './src/controllers/user.controller';
import dashBoard from './src/routes/dashboard';
import { ReportGames } from './src/models/reportGames.entity';
import { ReportPlataform } from './src/models/reportPlataform.entity';
import { ReportUsers } from './src/models/reportUsers.entity';


const userControl = new UserController();
const PORT = process.env.PORT_ENV;
var mysqlStore = require('express-mysql-session')(session);

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database
})

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database
});
const run = async () =>{
    const admiJsOptions = {
        assets: {
            styles: ["./sidebar.css"],
        },
        rootPath: '/admin',
        resources: [
            optionsResourceModel(Plataforms),
            optionsResourceModel(Games),
            optionsResourceModel(ReportGames),
            optionsResourceModel(ReportPlataform),
            optionsResourceModel(ReportUsers),
            optionsResourceModel(Users,
                userOptions,
                userEncryptPass,
        )],
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

    mongodb.once("open", () => {
        console.log('conexão aberta')
    })

    const admin = new AdminJS(admiJsOptions);

    const sessionStore = new mysqlStore(options);

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
                        if(userLogin.active){
                        return userLogin;
                    } else {
                        userControl.sendPin(userLogin.pin, userLogin.email, userLogin.name)
                        return false
                        }
                    }
                }else {
                return false
                }
                return false
            },
            cookieName: 'adminjs',
            cookiePassword: '0vXqcFO0rmJPxaMcg0mnlxw85818t2PP'     
        },
        null,
        {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: '0vXqcFO0rmJPxaMcg0mnlxw85818t2PP',
            cookie: {
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production'
            },
            name: 'adminjs'
        }
        );
   
    app.use(express.json())    
    app.use(express.static(path.join(__dirname, "./public")));
    hbs.registerPartials(path.join(__dirname + "./template"))
    app.set('view engine','hbs')
    app.use(admin.options.rootPath, adminRouter)
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/auth', auth)    
    app.use('/dashboard', dashBoard)    
    app.listen(PORT, () => {
        console.log('Funfando');
    })
}
run();


