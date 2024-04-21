import React, {useState} from 'react'
import './App.css';
const api = {
  key: "a26c6533c805daa684c8a3d20988f751",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if(e.key == 'Enter') {
    fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setLocation('')
      })
    }
  }
  
  const date_builder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app cold') : 'app'}>
      <div className='input-con'>
        <input 
          type="text" 
          placeholder='Search...' 
          onChange={e => setLocation(e.target.value)}
          value={location}
          onKeyPress={search}
        />
      </div>
      {typeof weather.main != 'undefined' ? 
      <div className='info-con'>
        <p className='location'>{weather.name}, {weather.sys.country}</p>
        <p className='date'>{date_builder(new Date())}</p>
        <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
        <p className='weather'>{weather.weather[0].main}</p>
      </div>
      : ''}
    </div>
  );
}

export default App;
