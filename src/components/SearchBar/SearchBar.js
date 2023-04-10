import { useState } from "react"
import { Input } from "antd";
import styles from "./SearchBar.module.css"
const { Search } = Input;


const SearchBar=(props)=>{
  const [, setEnteredInput] = useState("");
  //It passes the data from the input when pressed enter
  const inputChangeHandler = (event) => {
    console.log(event.target.value);
    setEnteredInput(event.target.value);
    props.onSearch(event.target.value);
  };
  //It passes the data from the input when search icon is pressed
  const searchChangeHandler = (event) => {
    setEnteredInput(event);
    props.onSearch(event);
  };
  return (
    <Search
      placeholder="Search"
      allowClear
      onPressEnter={inputChangeHandler}
      className={styles["search"]}
      onSearch={searchChangeHandler}
    />
  );
}
export default SearchBar;
