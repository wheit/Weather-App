import { useEffect, useState } from "react";
import styles from "./App.module.css";
import CurrentReport from "./components/CurrentReport/CurrentReport";
import HourlyReport from "./components/HourlyReport/HourlyReport";
import AddToFavorite from "./components/AddToFavorite/AddtoFavorite";
import CurrentLocation from "./components/CurrentLocation/CurrentLocation";
import SettingsTab from "./components/SettingsTab/SettingsTab";
import SearchBar from "./components/SearchBar/SearchBar";
import WeeklyReport from "./components/WeeklyReport/WeeklyReport";


function App() {
  const [latitude, setLatitude] = useState([]);
  const [longidute, setLongitude] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const [currentCity, setCurrentCity] = useState("");
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
        .then((data) => setCurrentWeather(data));
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
        <CurrentLocation location={currentCity}></CurrentLocation>
        <AddToFavorite></AddToFavorite>
        <SearchBar></SearchBar>
      
        {currentWeather ? (
          <CurrentReport weather={currentWeather?.current} />
        ) : null}

        {currentWeather ? (
          <HourlyReport weather={currentWeather?.hourly}></HourlyReport>
        ) : null}
      {currentWeather? (<WeeklyReport daily={currentWeather?.daily}></WeeklyReport>):null}
    
      </div>
    </main>
  );
}

export default App;
