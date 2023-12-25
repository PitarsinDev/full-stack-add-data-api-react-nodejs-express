import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState(null)

    const fetchData = async () => {
    const res = await fetch('http://localhost:3000/getData')
    const convertData = await res.json();
    setData(convertData);
    console.log(convertData);
  }

  useEffect(() => {
  fetchData();
  }, []);

  return (
    <>
    <div className='all'>
      {data ? (
        data.map(val => (
          <div key={val.id} className='info'>
            <h1>{val.column1}</h1>
            <p>{val.column2}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </>
  )
}

export default App
