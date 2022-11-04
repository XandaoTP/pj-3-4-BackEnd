import * as express from 'express' 


const auth = express.Router();



auth.get('/confirm-email', (req, res) => {
 res.render('confirm-email')
})

auth.post('/confirm-email', (req, res) => {
    console.log(req.body)
 res.render('confirm-email')
})

export default auth 