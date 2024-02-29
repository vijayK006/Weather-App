import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaLocationArrow  } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";


function App() {
  const [city, setCity] = useState('bengaluru');
  const [cityname, setCityname] = useState('');
  const [weather, setWeather] = useState('');
  const [weatherDecrip, setWeatherDecrip] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windspeed, setWindspeed] = useState('');
  const [country, setCountry] = useState('');
  const [cityNotFound, setCityNotFound] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [timezone, setTimezone] = useState('');


  const [localTime, setLocalTime] = useState('');
  useEffect(() => {
    const trimmedCity = city.trim();
    if (trimmedCity === '') {
      // If the input field is blank, reset all weather information to 0
      setCityname('');
      setWeather(0);
      setWeatherDecrip('');
      setTempMin(0);
      setTempMax(0);
      setHumidity(0);
      setWindspeed(0);
      setCountry('');
      setCityNotFound(false);
      return; // Stop further execution
    }

    

    axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=75acef0b705e673e7c6d7c47d0716bf8&units=metric`)
      .then(result => {
        console.log(result.data)

        setCityname(result.data.name);
        setTempMin(result.data.main.temp_min);
        setTempMax(result.data.main.temp_max);
        setHumidity(result.data.main.humidity);
        setWeather(result.data.main.temp);
       
        setWindspeed(result.data.wind.speed);
        setWeatherDecrip(result.data.weather[0].description);
        setCountry(result.data.sys.country);

    
setCityNotFound(false);
      })
      .catch(err =>{
         console.log('city not found please try any other city')
         setCityNotFound(true);
      });
  }, [city])



  useEffect(() => {
   // replace 'your_city_here' with the actual city
    const apiKey = 'EeyJRQpqGBnXUUvUCgAgBg==xe1WB6E1LGsIryN3';
    
    axios.get(`https://api.api-ninjas.com/v1/worldtime?city=${city}`, {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const utcTime = response.data.datetime;
      const hours = response.data.hour;
      const options = { hour12: true, hour: 'numeric', minute: 'numeric' };
      const localDateTime = new Date(utcTime).toLocaleString('en-US', options);
      setLocalTime(localDateTime);
      setTimezone(hours)
      // console.log(localDateTime); localtime data

      console.log(response.data); //international timezone
    })
    .catch(error => {
      console.error('Error: ', error);
    });
  }, [city]);

  const getuser = ()=>{
    const uname = document.getElementById('username').value;
    // console.log(uname)
// document.getElementById('nameUser').innerHTML= uname;
const userdetails = document.getElementById('userdetails');
userdetails.classList.add('close');
 
if(uname === ''){
document.getElementById('nameUser').innerHTML= 'Guest';
}else{
document.getElementById('nameUser').innerHTML= uname;
}
  }


  const findcity =()=>{
    const cityname = document.getElementById('cityname').value;
setCity(cityname);

if(cityname === ''){
  setCityNotFound(true);
  console.log('City name is empty')
}else{
  setCityNotFound(false);

}

  }

  useEffect(() => {
    if (timezone >= '00' && timezone < '12') {
      setGreeting('Good Morning!');
      document.getElementById('weathericon').classList.add('weather_morning');
      document.getElementById('weathericon').classList.remove('weather_afternoon');
  document.getElementById('weathericon').classList.remove('weather_evening');
 document.getElementById('weathericon').classList.remove('weather_night');
    } else if (timezone >= '12' && timezone < '18') {
      setGreeting('Good Afternoon!');
      document.getElementById('weathericon').classList.remove('weather_morning');
      document.getElementById('weathericon').classList.add('weather_afternoon');
  document.getElementById('weathericon').classList.remove('weather_evening');
 document.getElementById('weathericon').classList.remove('weather_night');

    } else if (timezone >= '18' && timezone < '20') {
      setGreeting('Good Evening!');
      document.getElementById('weathericon').classList.remove('weather_morning');
      document.getElementById('weathericon').classList.remove('weather_afternoon');
  document.getElementById('weathericon').classList.add('weather_evening');
 document.getElementById('weathericon').classList.remove('weather_night');
    } else {
      setGreeting('Good Night!');
      document.getElementById('weathericon').classList.remove('weather_morning');
      document.getElementById('weathericon').classList.remove('weather_afternoon');
  document.getElementById('weathericon').classList.remove('weather_evening');
 document.getElementById('weathericon').classList.add('weather_night');
    }
  }, [timezone]);

  return (
    <>


      <div className='weather_body'>

        <div className='weather-app'>
        <div className='position-relative'>
           <input type="text" placeholder='Type city name '
            className='searchinput'  id='cityname' />
            <button type='button'  onClick={findcity} className='search'>
              <IoSearchCircleSharp className='icon'/>
            </button>
        </div>
         

          <div className='d-flex justify-content-between py-4'>
            <div className='greet'>
              <span className='name'>Hi, <span id="nameUser"></span> </span>
              <h4>{greeting}  </h4>
            </div>

            <div className='time'>
              <h5>{localTime}</h5>
            </div>

          </div>


          <div className='d-flex justify-content-center'>

            <div className='weather_icon' id="weathericon" />
           
          </div>

          <div className='climate'>
            {cityNotFound ? (
              <h3 className='text-center'>City not found</h3>
            ) : (
              <>
                <h3 className='text-center'>{weather}&deg;C </h3>
                <p className='text-center'>{weatherDecrip}</p>
                <div className='d-flex justify-content-center'>
                  <div className='d-flex gap-2 align-items-center loc'>
                    <FaLocationArrow className='icon'/>
                    <h5>{cityname}, {country}</h5>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className='stats'>

            <div className='d-flex align-items-center justify-content-between border-bottom pb-2 pt-5'>
              <div className='d-flex align-items-center gap-1 '>
                <div className='icon temp_min' />
                <div className='report'>
                  <p>Min. Temperature</p>
                  <span>{tempMin}&deg;C</span>
                </div>
              </div>

              <div className='d-flex align-items-center gap-1 '>
                <div className='icon temp_max' />
                <div className='report'>
                  <p>Max. Temperature</p>
                  <span>{tempMax}&deg;C</span>
                  
          
                </div>
              </div>

            </div>

            <div className='d-flex align-items-center justify-content-between  pb-2 pt-3'>
              <div className='d-flex align-items-center gap-1 '>
                <div className='icon humidity' />
                <div className='report'>
                  <p>Humidity</p>
                  <span>{humidity}%</span>
                </div>
              </div>

              <div className='d-flex align-items-center gap-1'>
                <div className='icon wind' />
                <div className='report'>
                  <p>Wind Speed</p>
                  <span>{windspeed}/Kmpl</span>
                </div>
              </div>

            </div>

          </div>


        </div>

      </div>

<div className='model-body' id='userdetails'>
<div className='model-center'>
<h3 className='text-center pb-md-1 pb-3'>Explore Weather Updates from All Cities Worldwide!</h3>
<p className='text-center pb-4'>Welcome to my website, Stay Updated Anywhere, Know the Time and Weather of Every City Worldwide! </p>
  <input type='text' placeholder='Please Enter Your Name' id="username" className='prompt-field'/>
<br/>

<button type='button' className='btn-name'  onClick={getuser}>Send</button>
</div>

</div>


    </>

  );
}

export default App;



