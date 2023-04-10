import styles from "./WeeklyItem.module.css";
import { useState } from "react";
const WeeklyItem = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const clickHandler = () => {
    setIsClicked(!isClicked);
    console.log(props.rain)
  };
  return (
    <div className={styles["daily-item-container"]}>
      <div className={styles["daily-item"]} onClick={clickHandler}>
        <img
          src={require(`../../../resources/icon_${props.icon}.png`)}
          alt={`icon${props.icon}`}
          className={styles.icon}
        ></img>
        <label className={styles.day}>{props.date}</label>
        <label className={styles.description}>{props.description}</label>
        <label className={styles["min-max"]}>
          {Math.round(props.minTemp)}&deg;C/{Math.round(props.maxTemp)}&deg;C
        </label>
      </div>
      {isClicked ? (
        <div className={styles["daily-weather-detail"]}>
          <div>
            <label>Rain:</label>
            <span>{Math.round(props.rain * 100)}%</span>
          </div>
          <div>
            <label>Clouds:</label>
            <span>{props.clouds}%</span>
          </div>
          <div>
            <label>Humidity:</label>
            <span>{props.humidity}%</span>
          </div>
          <div>
            <label>Pressure:</label>
            <span>{props.pressure}hPa</span>
          </div>
          <div>
            <label>Wind:</label>
            <span>{Math.round(props.wind)}m/s</span>
          </div>

          <div>
            <label>UV Index:</label>
            <span>{props.uvi}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default WeeklyItem;
