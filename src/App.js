import { useEffect, useState } from "react";
import styles from "./App.module.css";
import CurrentReport from "./components/CurrentReport/CurrentReport";
import HourlyReport from "./components/HourlyReport/HourlyReport";
import AddToFavorite from "./components/AddToFavorite/AddtoFavorite";
import CurrentLocation from "./components/CurrentLocation/CurrentLocation";
import Alerts from "./components/Alerts/Alerts";

import SearchBar from "./components/SearchBar/SearchBar";
import WeeklyReport from "./components/WeeklyReport/WeeklyReport";
import FavoriteLocations from "./components/FavoriteLocations/FavoriteLocations";

function App() {
  const [latitude, setLatitude] = useState([]);
  const [longidute, setLongitude] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const [currentCity, setCurrentCity] = useState("");
  const [currentIsFavorite, currentSetIsFavorite] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [background, setBackground] = useState("");
  const [isLoading,setPageisLoaing]=useState(true)

  const getCityname = (lat, lon, ApiKey) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${ApiKey}`
    )
      .then((response) => response.json())
      .then((data) => setCurrentCity(data[0].name));
  };
  const getWeather = (lat, long, ApiKey) => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${ApiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setCurrentWeather(data));
  };
  const getCoords = (city, ApiKey) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${ApiKey}`
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  };
  const setData = (data) => {
    const lat = data[0].lat;
    const long = data[0].lon;
    setCurrentCity(data[0].name);
    getWeather(lat, long, ApiKey);
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
    console.log(value);
    if (!value) return;
    getCoords(value, ApiKey);
  };
  const addToFavoriteHandler = () => {
    currentSetIsFavorite(true);

    setFavoriteCities((prevState) => {
      if (prevState.includes(currentCity)) {
        return [...prevState];
      } else {
        return [...prevState, currentCity];
      }
    });
  };
  const removeFavoriteHandler = () => {
    currentSetIsFavorite(false);
    const newCities = favoriteCities.filter((el) => el !== currentCity);
    setFavoriteCities(newCities);
  };
 
  useEffect(() => {
    const favCity = JSON.parse(localStorage.getItem("favorite"));
    if (!favCity) return;

    setFavoriteCities(favCity);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  useEffect(() => {
    if (favoriteCities.includes(currentCity)) {
      currentSetIsFavorite(true);
    } else {
      currentSetIsFavorite(false);
    }
    
  }, [currentCity]);
  useEffect(() => {
    let description = currentWeather?.current.weather[0].main;
    if (!description) return;
    setBackground(description.toLowerCase());
    setPageisLoaing(false);
    
  }, [currentWeather]);
  return (
    <main className="App">
      {isLoading ? null : (
        <div className={`${styles["main-container"]} ${styles[background]}`}>
          <div className={styles["main-container-grid"]}>
            <FavoriteLocations
              onClick={searchHandler}
              favoriteLocations={favoriteCities}
              currentCity={currentCity}
            ></FavoriteLocations>
            <CurrentLocation location={currentCity}></CurrentLocation>
            <AddToFavorite
              onAdd={addToFavoriteHandler}
              onRemove={removeFavoriteHandler}
              isFavorite={currentIsFavorite}
            ></AddToFavorite>
            <SearchBar onSearch={searchHandler}></SearchBar>
            {currentWeather.alerts?<Alerts alerts={currentWeather.alerts}>e alerta</Alerts>:null}
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
      )}
    </main>
  );
}

export default App;
