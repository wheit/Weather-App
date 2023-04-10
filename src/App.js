import { useEffect, useState } from "react";
import styles from "./App.module.css";
import CurrentReport from "./components/CurrentReport/CurrentReport";
import HourlyReport from "./components/HourlyReport/HourlyReport";
import AddToFavorite from "./components/AddToFavorite/AddtoFavorite";
import CurrentLocation from "./components/CurrentLocation/CurrentLocation";
import Alerts from "./components/Alerts/Alerts";

import Swal from "sweetalert2";

import SearchBar from "./components/SearchBar/SearchBar";
import WeeklyReport from "./components/WeeklyReport/WeeklyReport";
import FavoriteLocations from "./components/FavoriteLocations/FavoriteLocations";

function App() {
  //States
  const [latitude, setLatitude] = useState([]);
  const [longidute, setLongitude] = useState([]);
  const [weather, setWeather] = useState();
  const [currentCity, setCurrentCity] = useState("");
  const [currentIsFavorite, currentSetIsFavorite] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [background, setBackground] = useState("");
  const [isLoading, setPageisLoaing] = useState(true);
  const [currentWeather, setCurrentWeather] = useState();
  //Api key
  const ApiKey = "fc0797b85352aced8966f0b89ebd950d";
  // Fetch city coordinates from OpenWeatherMap Geo API and handle errors with Swal.fire()
  const getCoords = (city, ApiKey) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${ApiKey}`
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Wrong input. Please enter a valid location",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  // Fetch and set weather data from OpenWeatherMap API using provided latitude, longitude, and API key
  const getWeather = (lat, long, ApiKey) => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${ApiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  };
  // Fetch and set current city name from OpenWeatherMap Geo API using provided latitude, longitude, and API key
  const getCityname = (lat, lon, ApiKey) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${ApiKey}`
    )
      .then((response) => response.json())
      .then((data) => setCurrentCity(data[0].name));
  };
  // Extract latitude, longitude from retrieved data, set the current city name, and fetch weather data using getWeather()
  const setData = (data) => {
    const lat = data[0].lat;
    const long = data[0].lon;
    setCurrentCity(data[0].name);
    getWeather(lat, long, ApiKey);
  };
  // Fetch coordinates for a given city name using getCoords() function with the provided value and API key

  const searchHandler = (value) => {
    if (!value) return;
    getCoords(value, ApiKey);
  };
  // Add current city to the list of favorite cities and set its isFavorite state to true
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
  // Set the current weather state to the provided weather object

  const currentWeatherHandler = (weather) => {
    setCurrentWeather(weather);
  };
  // Remove current city from the list of favorite cities and set its isFavorite state to false
  const removeFavoriteHandler = () => {
    currentSetIsFavorite(false);
    const newCities = favoriteCities.filter((el) => el !== currentCity);
    setFavoriteCities(newCities);
  };

  // Fetch weather data and current city name using getWeather() and getCityname() functions with the current location obtained using navigation API
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

  // Load favorite cities from localStorage when the component mounts
  useEffect(() => {
    const favCity = JSON.parse(localStorage.getItem("favorite"));
    if (!favCity) return;
    setFavoriteCities(favCity);
  }, []);

  // Save updated favorite cities to localStorage when the favoriteCities state changes
  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  // Update isFavorite state based on whether currentCity is in favoriteCities list
  useEffect(() => {
    if (favoriteCities.includes(currentCity)) {
      currentSetIsFavorite(true);
    } else {
      currentSetIsFavorite(false);
    }
  }, [currentCity]);

  // Update currentWeather state with the hourly weather for the current location
  useEffect(() => {
    if (!weather) return;
    setCurrentWeather(weather.hourly[0]);
  }, [weather]);

  // Update the background image and stop showing the loading screen once the current weather is set
  useEffect(() => {
    if (!currentWeather) return;
    let description = currentWeather.weather[0].main;
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
            {weather.alerts ? (
              <Alerts alerts={weather.alerts}>e alerta</Alerts>
            ) : null}
            {currentWeather ? <CurrentReport weather={currentWeather} /> : null}
            {weather ? (
              <HourlyReport
                weather={weather?.hourly}
                onClick={currentWeatherHandler}
                currentWeather={currentWeather}
              ></HourlyReport>
            ) : null}
            {weather ? (
              <WeeklyReport daily={weather.daily}></WeeklyReport>
            ) : null}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
