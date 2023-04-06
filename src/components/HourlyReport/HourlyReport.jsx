import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import styles from "./HourlyReport.module.css";
const HourlyReport = (props) => {
  const hours = [...props.weather.slice(0, 24)];
  const makehours = (unix) => {
    const miliseconds = unix * 1000;
    const date = new Date(miliseconds);
    return `${date.getHours()}:00`;
  };

  return (
    <>
      <div className={styles.hourly}>
        <label className={styles.title}>Hourly</label>
        <ScrollContainer>
          <div className={styles["hourly-items-container"]}>
            {hours.map((el) => {
              return (
                <div className={styles["hourly-item"]} key={el.dt}>
                  <label className="hour">{makehours(el.dt)}</label>
                  <img
                    className={styles.icon}
                    src={require(`../../resources/icon_${el.weather[0].icon}.png`)}
                    alt={`icon${el.weather[0].icon}`}
                  ></img>
                  <label className="temp">
                    {Math.round(el.temp)}&deg;
                    <span>C</span>
                  </label>
                </div>
              );
            })}
          </div>
        </ScrollContainer>
      </div>
    </>
  );
};
export default HourlyReport;
