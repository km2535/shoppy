import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../components/context/AuthContext";
import { uploadBocket } from "../../server/database";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { fbuser } = useAuthContext();
  const {
    state: {
      value: { price, option, imgUrl, name, gender, id, describe },
    },
  } = useLocation();
  const [size, setSize] = useState("XL");

  const [isLoading, setIsLoading] = useState(false);
  const fileHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "size":
        setSize(value);
        break;
      default:
        break;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    uploadBocket(
      name,
      gender,
      size,
      price,
      imgUrl,
      fbuser?.email,
      id,
      describe,
      fbuser?.uid
    ).then(() => setIsLoading(false));
  };
  return (
    <div className={styles.container}>
      <div className={styles.gender}>&gt;{gender}</div>
      <form onSubmit={submitHandler} className={styles.form}>
        <img src={imgUrl} alt="cloth" className={styles.img} />
        <div className={styles.describe}>
          <input type="text" disabled value={name} className={styles.name} />
          <input
            className={styles.price}
            type="text"
            disabled
            value={"￦" + price}
          />
          <input className={styles.txt} type="text" disabled value={describe} />
          <div className={styles.option}>
            옵션 :&nbsp;
            <select
              className={styles.select}
              name="size"
              id=""
              onChange={fileHandler}
            >
              {option.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          {/* <input
            type={"number"}
            name="count"
            value={count}
            step={1}
            min={1}
            onChange={fileHandler}
            required
          /> */}
          {isLoading ? (
            "로딩 중..."
          ) : (
            <input
              type="submit"
              value="장바구니에 추가"
              className={styles.btn}
            />
          )}
        </div>
      </form>
    </div>
  );
}
