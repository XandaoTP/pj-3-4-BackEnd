import { faker } from '@faker-js/faker';
import * as express from 'express' 
const dashBoard = express.Router();

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

dashBoard.get('/players/quantity', (req, res) => {
    res.statusCode = 200 
 res.json({
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  });
 })



export default dashBoard 