import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import styles from "./HourlyReport.module.css";
import HourlyItem from "./HourlyItem/HourlyItem";

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
  console.log(hours);

  return (
    <>
      <div className={styles.hourly}>
        <label className={styles.title}>Hourly</label>
        <ScrollContainer>
          <div className={styles["hourly-items-container"]}>
            {hours.map((el) => {
              return (
                <HourlyItem
                  weather={el}
                  key={el.dt}
                  hour={makehours(el.dt)}
                  icon={el.weather[0].icon}
                  temp={Math.round(el.temp)}
                  onClick={clickHandler}
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
