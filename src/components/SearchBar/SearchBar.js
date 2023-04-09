import { useState } from "react"
import { Input } from "antd";
import styles from "./SearchBar.module.css"
const { Search } = Input;


const SearchBar=(props)=>{
  const [enteredInput, setEnteredInput] = useState("");

  const inputChangeHandler = (event) => {
    console.log(event.target.value)
    setEnteredInput(event.target.value);
    props.onSearch(event.target.value);
    
    
  };
  const searchChangeHandler=(event)=>{
    console.log(event)
    setEnteredInput(event)
    props.onSearch(event)

  }
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
