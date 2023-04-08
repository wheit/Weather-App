import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styles from "./AddtoFavorite.module.css";
const AddToFavorite = (props) => {
  return (
    <label className={styles["add-to-favorite"]}>
      {!props.isFavorite ? (
        <HeartOutlined
          style={{ fontSize: "3.2rem", color: "red" }}
          onClick={props.onAdd}
        />
      ) : (
        <HeartFilled
          style={{ fontSize: "3.2rem", color: "red" }}
          onClick={props.onRemove}
        />
      )}
    </label>
  );
};
export default AddToFavorite;
