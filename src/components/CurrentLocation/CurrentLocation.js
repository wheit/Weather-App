import styles from "./CurrentLocation.module.css"
const CurrentLocation = (props) => {
  return( <div className={styles.location}>{props.location}</div>)
 
};
export default CurrentLocation;
