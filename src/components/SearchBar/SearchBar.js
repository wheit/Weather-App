import { useState } from "react"
import { Input } from "antd";
import styles from "./SearchBar.module.css"

const SearchBar=(props)=>{
  const [enteredInput, setEnteredInput] = useState("");

  const inputChangeHandler = (event) => {
   setEnteredInput(event.target.value)
    props.onSearch(event.target.value)
   
    
  };
  return (
    <Input
      className={styles.search}
      type={Input.Search}
      allowClear={true}
      
      onPressEnter={inputChangeHandler}
      
    ></Input>
  );
}
export default SearchBar;
