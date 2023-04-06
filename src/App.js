import { useEffect, useState } from "react";
import styles from "./App.module.css"
import CurrentReport from "./components/CurrentReport/CurrentReport";
import HourlyReport from "./components/HourlyReport/HourlyReport";



function App() {
  const [latitude, setLatitude] = useState([]);
  const [longidute, setLongitude] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const [currentCity,setCurrentCity]=useState('')
  const ApiKey = "fc0797b85352aced8966f0b89ebd950d";
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
  
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
      if (latitude.length === 0) return;
      await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longidute}&exclude={part}&appid=${ApiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => setCurrentWeather(data))
        await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longidute}&limit=5&appid=${ApiKey}`
        )
          .then((response) => response.json())
          .then((data) => setCurrentCity(data[0].name));
    
    };
    fetchData();
   
   
  }, [latitude, longidute]);
 

  return (
    <main className="App">
      <div className={styles["main-container"]}>
        {currentWeather? <CurrentReport
            weather={currentWeather?.current}
            location={currentCity}
          />:null}
        {currentWeather? <HourlyReport weather={currentWeather?.hourly}></HourlyReport>:null}
       
      </div>
    </main>
  );
}

export default App;
