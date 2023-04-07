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
  const getCityname = (lat, lon, ApiKey) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${ApiKey}`
    )
      .then((response) => response.json())
      .then((data) => setCurrentCity(data[0].name));
  };
  const getWeather = (lat, long, ApiKey) => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${ApiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setCurrentWeather(data));
  };
  const getCoords = (city, ApiKey) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${ApiKey}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const ApiKey = "fc0797b85352aced8966f0b89ebd950d";
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
      if (latitude.length === 0) return;
      await getWeather(latitude, longidute, ApiKey);
      await getCityname(latitude, longidute, ApiKey);
    };
    fetchData();
  }, [latitude, longidute]);
  const searchHandler = (value) => {
    if (!value) return;
    
    getCoords(value,ApiKey);
  };

  return (
    <main className="App">
      <div className={styles["main-container"]}>
        <div className={styles["main-container-grid"]}>
          <CurrentLocation location={currentCity}></CurrentLocation>
          <AddToFavorite></AddToFavorite>
          <SearchBar onSearch={searchHandler}></SearchBar>

          {currentWeather ? (
            <CurrentReport weather={currentWeather?.current} />
          ) : null}

          {currentWeather ? (
            <HourlyReport weather={currentWeather?.hourly}></HourlyReport>
          ) : null}
          {currentWeather ? (
            <WeeklyReport daily={currentWeather?.daily}></WeeklyReport>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default App;
