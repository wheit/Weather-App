import { HeartOutlined, HeartFilled } from "@ant-design/icons";
const AddToFavorite=()=>{
    return (
      <label className="add-to-favorite">
        <HeartOutlined style={{ fontSize: "3.2rem", color: "red" }} />
        <HeartFilled style={{ fontSize: "3.2rem", color: "red" }} />
      </label>
    );
}
export default AddToFavorite