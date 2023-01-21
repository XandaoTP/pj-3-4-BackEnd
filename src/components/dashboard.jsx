import { useState, useEffect } from 'react'
import useSWR from 'swr'
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
import moment from 'moment';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const optPlayersQty = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Usuarios por campeonato',
      },
    },
  };
  

const col = {
    width: '50%',
    float: 'left',
    boxSizing: 'border-box',
    padding: '5px' 
  }
const item ={
  background: '#333',
  height: '300px',
  width: '100%',
  color: '#fff',
  alignitems: 'center'
}
const input = {
  padidng: '5px',
  fontSize: '1.2em'
}

const fetcher = (...args) => fetch(...args).then(res => res.json())


const dashBoards = () => {

  const [ initialDate, setInitialDate ] = useState('')
  const [ finalDate, setFinalDate ] = useState('')
  const [ selectDate, setSelectDate ] = useState('all')
  const { data: plyrQty } = useSWR(`http://localhost:3000/dashboard/players/quantity?initial_date=${initialDate}&final_date=${finalDate}&select_date=${selectDate}`, fetcher)
  const { data: PlatQty } = useSWR(`http://localhost:3000/dashboard/plataform/quantity?initial_date=${initialDate}&final_date=${finalDate}&select_date=${selectDate}`, fetcher)
  const { data: gamesQty } = useSWR(`http://localhost:3000/dashboard/games/quantity?initial_date=${initialDate}&final_date=${finalDate}&select_date=${selectDate}`, fetcher)
  console.log(plyrQty)

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
                      disabled={selectDate !== 'custom'}
                      max={finalDate !== ''  ? finalDate : moment().format('YYYY-MM-DD')}
                    />
                    <input 
                      type="date" 
                      style={input}
                      value={finalDate}
                      onChange={(e) => setFinalDate(e.target.value)}
                      disabled={selectDate !== 'custom'}
                      max={moment().format('YYYY-MM-DD')}
                      min={initialDate !== '' ? initialDate : null}
                      />
                    <select 
                      id='' 
                      style={input}
                      onChange={(e) => setSelectDate(e.target.value)}
                    >
                        <option value='all'>Tudo</option>
                        <option value='7'>7 Dias</option>
                        <option value='15'>15 dias</option>
                        <option value='30'>1 mês</option>
                        <option value='180'>6 meses</option>
                        <option value='360'>1 ano</option>
                        <option value='custom'>Custom</option>
                    </select>   
                </div>
                <div>
                  {plyrQty ?
                    <div style={col}>
                      <div style={item}><Bar options={optPlayersQty} data={plyrQty}/>
                      </div>
                    </div> : ''
                    }
                    {PlatQty ?
                    <div style={col}>
                      <div style={item}><Bar options={optPlayersQty} data={PlatQty}/>
                      </div>
                    </div> : ''
                    }
                     {gamesQty ?
                    <div style={col}>
                      <div style={item}><Bar options={optPlayersQty} data={gamesQty}/>
                      </div>
                    </div> : <p>sdas</p>
                    }
                </div>
            </div>
}
export default dashBoards;