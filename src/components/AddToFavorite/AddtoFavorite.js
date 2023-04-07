import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styles from "./AddtoFavorite.module.css";
const AddToFavorite=()=>{
    return (
      <label className={styles["add-to-favorite"]}>
        <HeartOutlined style={{ fontSize: "3.2rem", color: "red" }} />
        <HeartFilled style={{ fontSize: "3.2rem", color: "red" }} />
      </label>
    );
}
export default AddToFavorite