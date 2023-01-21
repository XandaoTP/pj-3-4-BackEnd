import { faker } from '@faker-js/faker';
import * as express from 'express' 
import GamesController from '../controllers/gamesController';
import PlataformController from '../controllers/plataformController';
import ReportUserController from '../controllers/ReportUsercontroller';
const dashBoard = express.Router();

const labes = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

dashBoard.get('/games/quantity', async (req: any, res) => {
  const gamesCtrl = new GamesController();
  const result = await gamesCtrl.get(req.query);
  console.log(result)

  const data = result.map((r: any) => r.sum);
  const labels = result.map((r: any) => r._id);


  res.statusCode = 200 
  res.json({
  labels,
  datasets: [
    {
      label: 'Games disponíveis',
      data: data,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
});
})

dashBoard.get('/players/quantity', async (req, res) => {
  const usersCtrl = new ReportUserController();
  const result = await usersCtrl.get(req.query);
  console.log(result)

  const data = result.map((r: any) => r.sum);
  const labels = result.map((r: any) => r._id);

    res.statusCode = 200 
 res.json({
    labels: labels,
    datasets: [
      {
        label: 'Usuarios Cadastrados ',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  });
 })

 dashBoard.get('/plataform/quantity', async (req, res) => {
  const platafofmCtrl = new PlataformController();
  const result = await platafofmCtrl.get(req.query);
  console.log(result)

  const data = result.map((r: any) => r.sum);
  const labels = result.map((r: any) => r._id);

  res.statusCode = 200 
res.json({
  labels: labels,
  datasets: [
    {
      label: 'Jogos mais vendidos',
      data: data,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
});
})


export default dashBoard 