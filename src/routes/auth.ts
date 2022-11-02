import express from 'express' 

const auth = express.Router();

auth.get('/confirm-email', (req, res) => {
 res.render('confirm-email')
})

export default auth 