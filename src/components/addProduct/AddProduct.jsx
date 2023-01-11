import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { upload } from "../../server/imgdata";
import { useAuthContext } from "../context/AuthContext";
import styles from "./AddProduct.module.css";

export default function AddProduct() {
  const navigate = useNavigate();
  const { fbuser } = useAuthContext();
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [option, setOption] = useState("");
  const [price, setPrice] = useState(0);
  const [describe, setDescribe] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileHandler = (e) => {
    const { name, value, files } = e.target;
    switch (name) {
      case "file":
        setFile(files[0]);
        break;
      case "name":
        setName(value);
        break;
      case "describe":
        setDescribe(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "option":
        setOption(value.split(","));
        break;
      case "price":
        setPrice(value);
        break;
      default:
        break;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    upload(file, name, gender, option, price, describe).then(() => {
      setFile();
      setName("");
      setGender("남성");
      setOption("");
      setPrice("");
      setDescribe("");
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fbuser?.isAdmin || navigate("/");
  }, [navigate, fbuser?.isAdmin]);
  return (
    <div className={styles.container}>
      <div className={styles.thumbnail}>새로운 제품 등록</div>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          className={styles.file}
          type="file"
          name="file"
          onChange={fileHandler}
          required
        />
        <input
          className={styles.name}
          type="text"
          name="name"
          value={name}
          onChange={fileHandler}
          placeholder="제품명"
          required
        />
        <input
          className={styles.price}
          type="text"
          name="price"
          onChange={fileHandler}
          value={price}
          placeholder="가격(숫자만 입력)"
          required
        />
        <div className={styles.gender}>
          <label htmlFor="gender">
            남성
            <input
              type="radio"
              name="gender"
              value={"남성"}
              onChange={fileHandler}
              required
            />
          </label>
          <label htmlFor="gender">
            여성
            <input
              type="radio"
              name="gender"
              value={"여성"}
              onChange={fileHandler}
              required
            />
          </label>
        </div>
        <input
          className={styles.describe}
          type="text"
          name="describe"
          value={describe}
          onChange={fileHandler}
          placeholder="제품 설명"
          required
        />

        <input
          className={styles.option}
          type="text"
          name="option"
          value={option}
          onChange={fileHandler}
          placeholder="옵션(콤마로 구분)"
          required
        />

        {isLoading ? (
          "로딩 중..."
        ) : (
          <input className={styles.btn} type="submit" value="제품등록하기" />
        )}
      </form>
    </div>
  );
}
