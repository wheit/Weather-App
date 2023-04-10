import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import styles from "./HourlyReport.module.css";
import HourlyItem from "./HourlyItem/HourlyItem";
import { useState } from "react";

const HourlyReport = (props) => {
 

  
  const clickHandler = (e) => {
   props.onClick(e)
  };
  
  const hours = [...props.weather.slice(0, 24)];
  const makehours = (unix) => {
    const miliseconds = unix * 1000;
    const date = new Date(miliseconds);
    return `${date.getHours()}:00`;
  };
  
   const activeIndex=hours.indexOf(props.currentWeather)
  return (
    <>
      <div className={styles.hourly}>
        <label className={styles.title}>Hourly</label>
        <ScrollContainer>
          <div className={styles["hourly-items-container"]}>
            {hours.map((el,index) => {
              return (
                <HourlyItem
                  weather={el}
                  key={el.dt}
                  hour={makehours(el.dt)}
                  icon={el.weather[0].icon}
                  temp={Math.round(el.temp)}
                  onClick={clickHandler}
                  className={activeIndex===index? 'active':  null}
                ></HourlyItem>
              );
            })}
          </div>
        </ScrollContainer>
      </div>
    </>
  );
};
export default HourlyReport;
