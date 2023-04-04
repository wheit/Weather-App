import styles from "./CurrentReport.module.css";
const CurrentReport = (props) => {
  if (!props.weather) return;
  console.log(props.weather);
  const location = props.weather.name;
  const makeCelsius = (temperature) => {
    return Math.round(temperature - 273.15);
  };
  const weatherCode = props.weather.weather[0].icon;

  const tempCelcius = makeCelsius(props.weather.main.temp);
  const feelsCelsius = makeCelsius(props.weather.main.feels_like);
  const description = props.weather.weather[0].description;
  return (
    <>
      <div className={styles.location}>{location}</div>
      <div className={styles["current-weather"]}>
        <img
          className={styles.icon}
          src={require(`../../resources/icon_${weatherCode}.png`)}
          alt="icon"
        ></img>
        <div className={styles.details}>
          <label className={styles["current-temp"]}>
            {tempCelcius}
            &deg;
            <span>C</span>
          </label>
          <label className={styles["feels-like"]}>
            Feels Like:
            <span>{feelsCelsius}&deg;</span>
          </label>
          <label className={styles.description}>{description}</label>
        </div>
      </div>
    </>
  );
};
export default CurrentReport;
