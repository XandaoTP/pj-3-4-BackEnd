import { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import faker from 'faker';



  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

const col = {
    width: '50%',
    float: 'left',
    boxSizing: 'border-box',
    padding: '5px' 
  }
const item ={
  background: '#333',
  height: '500px',
  width: '100%',
  color: '#fff'
}
const input = {
  padidng: '5px',
  fontSize: '1.2em'
}
const dashBoards = () => {

  const [ initialDate, setInitialDate ] = useState('')
  const [ finalDate, setFinalDate ] = useState('')
  const [ selectDate, setSelectDate ] = useState('all')
  
  useEffect(() => {
      if(selectDate !== 'custom') {
        setInitialDate('');
        setFinalDate('');
      }
  }, [selectDate])


    return <div className={'container-fluid'}>
                <div style={{
                    display: 'block',
                    textAlign: 'right',
                    padding: '15px',
                    boxSizing: 'border-box'
                }}>
                    <input 
                      type="date" 
                      style={input}
                      value={initialDate}
                      onChange={(e) => setInitialDate(e.target.value)}
                      disabled={selectDate !== 'custom'}/>
                    <input 
                      type="date" 
                      style={input}
                      value={finalDate}
                      onChange={(e) => setFinalDate(e.target.value)}
                      disabled={selectDate !== 'custom'}/>
                    <select 
                      id='' 
                      style={input}
                      onChange={(e) => setSelectDate(e.target.value)}>
                        <option value='all'>Tudo</option>
                        <option value='7'>7 Dias</option>
                        <option value='15'>15 dias</option>
                        <option value='30'>1 mês</option>
                        <option value='180'>6 meses</option>
                        <option value='360'>1 ano</option>
                        <option value='custom'>Custom</option>
                    </select>   
                </div>
            </div>
}
export default dashBoards;