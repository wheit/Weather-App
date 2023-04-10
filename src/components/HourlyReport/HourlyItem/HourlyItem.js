import styles from "./HourlyItem.module.css"
const HourlyItem=(props)=>{
  //Pases the data to the HourlyReport.js
    const putWeather=()=>{
        props.onClick(props.weather)

    }
    return (
      <div className={`${styles["hourly-item"]} ${styles[props.className]}`} onClick={putWeather}>
        <label className="hour">{props.hour}</label>
        <img
          className={styles.icon}
          src={require(`../../../resources/icon_${props.icon}.png`)}
          alt={`icon${props.icon}`}
        ></img>
        <label className="temp">
          {props.temp}
          &deg;
          <span>C</span>
        </label>
      </div>
    );

}
export default HourlyItem