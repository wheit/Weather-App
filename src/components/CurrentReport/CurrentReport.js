import DetaildReport from "../DeteildReport/DetaildReport";
import styles from "./CurrentReport.module.css";
const CurrentReport = (props) => {
 
  return (
    <>
      <section className={styles["current-weather"]}>
        <img
          className={styles.icon}
          src={require(`../../resources/icon_${props.weather.weather[0].icon}.png`)}
          alt="icon"
        ></img>
        <div className={styles.details}>
          <label className={styles["current-temp"]}>
            {Math.round(props.weather.temp)}
            &deg;
            <span>C</span>
          </label>
          <label className={styles["feels-like"]}>
            Feels Like:
            <span>{Math.round(props.weather["feels_like"])}&deg;</span>
          </label>
          <label className={styles.description}>
            {props.weather.weather[0].description}
          </label>
        </div>
      </section>
      <DetaildReport
        clouds={props.weather.pop}
        humidity={props.weather.humidity}
        visibility={props.weather.visibility}
        wind={props.weather["wind_speed"]}
        pressure={props.weather.pressure}
        uvi={props.weather.uvi}
      ></DetaildReport>
    </>
  );
};
export default CurrentReport;
