import { WarningOutlined } from "@ant-design/icons";

import styles from "./Alerts.module.css";
import { useState } from "react";

const Alerts = (props) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [isClicked, setIsClicked] = useState(false);
  const clickHandler = () => {
    setIsClicked(!isClicked);
  };
  // Function to set color warning for the icon based on message
  const setColorWarning = (message) => {
    if (message.toLowerCase().includes("yellow")) {
      return "yellow";
    } else if (message.toLowerCase().includes("orange")) {
      return "orange";
    } else {
      return "red";
    }
  };
  //This function adds a zero to minutes if they are 0
  const addZeroTominutes = (date) => {
    if (date.getMinutes() === 0) {
      return `${date.getMinutes()}0`;
    } else {
      return date.getMinutes();
    }
  };
  //This function takes a Unix timestamp value, converts it into a JavaScript date object, and returns a formatted string that includes the date, month, hour, and minute.
  const getDate = (value) => {
    const date = new Date(value * 1000);

    return `${date.getDate()} ${
      month[date.getMonth()]
    },${date.getHours()}:${addZeroTominutes(date)}`;
  };

  return (
    <section className={styles["alerts-container"]} onClick={clickHandler}>
      <div className={styles["alerts-main"]}>
        <WarningOutlined
          style={{
            fontSize: "2.4rem",
            color: `${setColorWarning(
              props.alerts[props.alerts.length - 1].event
            )}`,
          }}
        />
        <label className={styles.title}>
          {props.alerts[props.alerts.length - 1].tags[0]}
        </label>
      </div>
      {isClicked
        ? props.alerts.map((el, index) => {
            return (
              <div
                key={`${el.description} ${index}`}
                className={styles["alert-item"]}
              >
                <div className={styles["event-name-dates"]}>
                  <div className={styles["event-name"]}>{el.event}</div>
                  <div className={styles["dates"]}>
                    <div>From {getDate(el.start)}</div>
                    <div>Untill {getDate(el.end)}</div>
                  </div>
                </div>

                <div className={styles["description"]}>{el.description}</div>
              </div>
            );
          })
        : null}
    </section>
  );
};
export default Alerts;
