import axios from 'axios';
import { useState,useEffect } from 'react';
import './App.css';

const URL = "http://localhost/ostoslista2022/";

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");


  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data)
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }, [])

  function save(e){
    e.preventDefault();
    const json = JSON.stringify({description:item});
    axios.post(URL + "add.php",json, {
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then((response) => {
      setItems(items => [...items,response.data]);
      setItem("");
    }).catch(error =>{
      alert(error.response ? error.response.data.error : error);
    })
  }

  return (
    <div className='Container'>
      <form onSubmit={save}>
        <div>
          <h2>Ostoslista</h2>
        </div>
        <input value={item.description} placeholder='Tuote' onChange={e => setItem(e.target.value)}></input>
        <input value={item.amount} placeholder='Määrä' onChange={e => setItem(e.target.value)}></input>
        <div>
          <button>Lisää</button>
        </div>
      </form>
      <ol>
        {items?.map(item =>(
          <li key={item.id}>{item.description} {item.amount}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
