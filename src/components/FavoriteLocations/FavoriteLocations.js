
import styles from "./FavoriteLocations.module.css";
import "react-indiana-drag-scroll/dist/style.css";
import ScrollContainer from "react-indiana-drag-scroll";

const FavoriteLocations = (props) => {
  //Get's favorite location name to App.js so it can fetch the data
  const clickHandler = (e) => {
    props.onClick(e.target.textContent);
  };
  return (
    <div className={styles["favorite-locations-container"]}>
      <label>Favorite Locations</label>
      <div>
        <ScrollContainer className={styles["favorite-locations"]}>
          {props.favoriteLocations.map((el) => {
            return (
              <div
                key={el}
                onClick={clickHandler}
                className={`${styles["location-item"]} ${
                  props.currentCity === el ? styles["active"] : null
                }`}
              >
                {el}
              </div>
            );
          })}
        </ScrollContainer>
      </div>
    </div>
  );
};
export default FavoriteLocations;
