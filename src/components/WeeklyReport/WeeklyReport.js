import React from 'react'
import styles from "./WeeklyReport.module.css"

export const WeeklyReport = (props) => {
     const daysOfWeek = [
       "Sunday",
       "Monday",
       "Tuesday",
       "Wednesday",
       "Thursday",
       "Friday",
       "Saturday",
     ];
   
    const makeDays = (unix) => {
      const miliseconds = unix * 1000;
      const date = new Date(miliseconds);
      const dayIndex = date.getDay();
      return  daysOfWeek[dayIndex]
    };
  return (
    <div className={styles["daily-report"]}>
      <label className={styles.title}>Daily</label>
      <div className={styles["hourly-items-container"]}>
        {props.daily.map((el) => {
          return (
            <div key={el.dt} className={styles["hourly-item"]}>
              <img
                src={require(`../../resources/icon_${el.weather[0].icon}.png`)}
                alt={`icon${el.weather[0].icon}`}
                className={styles.icon}
              ></img>
              <label className={styles.day}>{makeDays(el.dt)}</label>
              <label className={styles.description}>{el.weather[0].description}</label>
              <label className={styles['min-max']}>
                {Math.round(el.temp.min)}&deg;C/{Math.round(el.temp.max)}
                &deg;C
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default WeeklyReport
