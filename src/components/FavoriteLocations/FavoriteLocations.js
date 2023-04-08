import { useState } from "react";
import styles from "./FavoriteLocations.module.css";
const FavoriteLocations = (props) => {
  
  const[favClicked,setFavClicked]=useState(false);
  const clickHandler=(e)=>{
 
    props.onClick(e.target.textContent)

  }
  return (
    <div className={styles["favorite-locations-container"]}>
      <label>Favorite Locations</label>
      <div className={styles["favorite-locations"]}>
        {props.favoriteLocations.map((el) => {
          return <div key={el} onClick={clickHandler}>{el}</div>;
        })}
      </div>
    </div>
  );
};
export default FavoriteLocations;
