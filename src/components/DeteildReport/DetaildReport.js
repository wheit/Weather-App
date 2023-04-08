import styles from "./DetaildReport.module.css"
const DetaildReport=(props)=>{
    
    return (
      <div className={styles["current-weather-details"]}>
        <div className="current-clouds">
          <label>Clouds:</label>
          <span>{props.clouds}%</span>
        </div>
        <div className="current-pressure">
          <label>Pressure:</label>
          <span>{props.pressure}hPa</span>
        </div>
        <div className="current-humidity">
          <label>Humidity:</label>
          <span>{props.humidity}%</span>
        </div>
        <div className="current-visibility">
          <label>Visibility:</label>
          <span>{Math.round(props.visibility / 1000)}km</span>
        </div>
        <div className="current-wind-speed">
          <label>Wind speed:</label>
          <span>{Math.round(+props.wind)}m/s</span>
        </div>
      </div>
    );

}
export default DetaildReport