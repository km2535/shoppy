import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { uploadBocket } from "../../server/fireStore";
import { useAuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
export default function ProductDetail() {
  const { fbuser } = useAuthContext();
  const {
    state: {
      value: { price, option, imgUrl, name, gender },
    },
  } = useLocation();
  const [size, setSize] = useState("XL");
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fileHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "size":
        setSize(value);
        break;
      case "count":
        setCount(value);
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
      count,
      fbuser?.email,
      uuidv4()
    ).then(() => setIsLoading(false));
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <img src={imgUrl} alt="cloth" />
        <input type="text" disabled value={name} />
        <select name="size" id="" onChange={fileHandler}>
          {option.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <input type="text" disabled value={price} />
        <input
          type={"number"}
          name="count"
          value={count}
          step={1}
          min={1}
          onChange={fileHandler}
          required
        />
        {isLoading ? "로딩 중..." : <input type="submit" value="장바구니" />}
      </form>
    </div>
  );
}
