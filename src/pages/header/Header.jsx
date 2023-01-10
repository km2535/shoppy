import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.imgContainer}>
      <div
        className={styles.img}
        style={{ backgroundImage: "url(./image/8.jpg)" }}
      ></div>
      <div className={styles.description}>
        <p className={styles.txt}>Shop with US</p>
        <p className={styles.subTxt}>Best Products, High Quality</p>
      </div>
    </div>
  );
}
