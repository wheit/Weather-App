import { useEffect, useState } from "react";
import styles from "./App.module.css"
import CurrentReport from "./components/CurrentReport/CurrentReport";



function App() {
  const [latitude, setLatitude] = useState([]);
  const [longidute, setLongitude] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const ApiKey = "fc0797b85352aced8966f0b89ebd950d";
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
  
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
      if (latitude.length === 0) return;
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longidute}&appid=${ApiKey}`
      )
        .then((response) => response.json())
        .then((data) => setCurrentWeather(data));
    };
    fetchData();
  }, [latitude, longidute]);

  return (
    <main className="App">
      <div className={styles['main-container']}>
        <CurrentReport weather={currentWeather} />
      </div>
    </main>
  );
}

export default App;
