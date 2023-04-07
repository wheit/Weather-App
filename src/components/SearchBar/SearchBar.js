import { useEffect, useState } from "react"
import { Input } from "antd";
import styles from "./SearchBar.module.css"

const SearchBar=(props)=>{
  const [enteredInput, setEnteredInput] = useState("");
//   useEffect(() => {
//     const identifier = setTimeout(() => {
//       props.onSearch(enteredInput)
//     }, 1000);
//     return () => {
//       clearTimeout(identifier);
//     };
//   }, [enteredInput]);
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
      placeholder="Enter a city"
    ></Input>
  );
}
export default SearchBar;
