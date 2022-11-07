import * as express from 'express' 
const auth = express.Router();



auth.get('/confirm-email', (req, res) => {
 res.render('confirm-email')
})

auth.post('/confirm-email', (req, res) => {
    console.log(req.body)
    res.statusCode = 200
    res.send({msg:'E-mail confirmado com sucesso.'})
})

export default auth 