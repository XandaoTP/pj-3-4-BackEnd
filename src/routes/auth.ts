import * as express from 'express' 
const auth = express.Router();
import userController from '../controllers/user.controller'

const userControl = new userController();

auth.get('/confirm-email', (req, res) => {
 res.render('confirm-email')
})

auth.post('/confirm-email', async (req, res) => {
    console.log(req.body)
    const result: any = await userControl.confirmEmail(req.body.pin)
    res.statusCode = result.statusCode
    res.send({msg:result.msg})
})

export default auth 