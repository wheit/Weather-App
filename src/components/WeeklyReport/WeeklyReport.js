import React from "react";
import styles from "./WeeklyReport.module.css";
import WeeklyItem from "./WeeklyItem/WeeklyItem";

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
  //This function converts a Unix timestamp to a string representing the day of the week, such as "Monday", "Tuesday", etc. Here is the commented code:
  const makeDays = (unix) => {
    const miliseconds = unix * 1000;
    const date = new Date(miliseconds);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };
  return (
    <div className={styles["daily-report"]}>
      <label className={styles.title}>Daily</label>
      <div className={styles["daily-items-container"]}>
        {props.daily.map((el) => {
          
          return (
            <WeeklyItem
              key={el.dt}
              icon={el.weather[0].icon}
              date={makeDays(el.dt)}
              minTemp={el.temp.min}
              maxTemp={el.temp.max}
              description={el.weather[0].description}
              humidity={el.humidity}
              clouds={el.clouds}
              wind={el["wind_speed"]}
              pressure={el.pressure}
              rain={el.pop}
              uvi={el.uvi}
            ></WeeklyItem>
          );
        })}
      </div>
    </div>
  );
};
export default WeeklyReport;
