import styles from "./CurrentLocation.module.css"
const CurrentLocation = (props) => {
  return( <section className={styles.location}>{props.location}</section>)
 
};
export default CurrentLocation;
