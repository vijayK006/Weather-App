import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [cityname, setCityname] = useState('');
  const [weather, setWeather] = useState('');
  const [tempMin, setTempMin] = useState('0');
  const [tempMax, setTempMax] = useState('0');

  useEffect(() => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=75acef0b705e673e7c6d7c47d0716bf8&units=metric`)
      .then(result => {
        console.log(result.data)

        setCityname(result.data.name);
        setTempMin(result.data.main.temp_min);
        //         if(result.data.main.temp_min < 18){
        //           document.getElementById('weatherbg').classList.add('weather_stats');

        //         }else{
        // document.getElementById('weatherbg').classList.remove('weather_stats');

        //         }
        setTempMax(result.data.main.temp_max);
        setWeather(result.data.weather[0].main.temp);

      })
      .catch(err => console.log('city not found please try any other city'))
  }, [city])

  return (
    <>


      <div className='weather_body'>

        <div className='weather-app '>
          <input type="text" placeholder='Type city name '
            onChange={(e) => setCity(e.target.value)} className='searchinput' />

          <div className='greet py-4'>
            <span className='name'>Hi, Vijay S Kale</span>
            <h5>Good Evening</h5>
          </div>

          <div className='d-flex justify-content-center'>
            <div className='weather_icon' id="weathericon" />
            </div>

            <div className='climate'>
              <h3 className='text-center'>27&deg;C</h3>
              <p className='text-center'>CLOUDY</p>
            </div>

         

        </div>

      </div>



    </>

  );
}

export default App;
