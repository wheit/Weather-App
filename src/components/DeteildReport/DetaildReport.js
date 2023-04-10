import styles from "./DetaildReport.module.css"
const DetaildReport=(props)=>{
 
    
    return (
      <section className={styles["current-weather-details"]}>
        <div className="current-clouds">
          <label>Rain:</label>
          <span>{Math.round(props.clouds*100)}%</span>
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
        <div className="current-uv-index">
          <label>UV Index</label>
          <span>{props.uvi}</span>
        </div>
      </section>
    );

}
export default DetaildReport