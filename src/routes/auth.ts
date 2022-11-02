import express from 'express' 

const auth = express.Router();

auth.get('/confirm-email', (req, res) => {
 res.send('oi')
})

export default auth 