import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { upload } from "../../server/imgdata";
import { useAuthContext } from "../context/AuthContext";

export default function AddProduct() {
  const navigate = useNavigate();
  const { fbuser } = useAuthContext();
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [option, setOption] = useState("");
  const [price, setPrice] = useState("");
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
    upload(file, name, gender, option, price).then(() => {
      setFile();
      setName("");
      setGender("남성");
      setOption("");
      setPrice("");
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fbuser?.isAdmin || navigate("/");
  }, [navigate, fbuser?.isAdmin]);
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={fileHandler}
        placeholder="상품명을 작성하세요"
      />
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
      <input
        type="text"
        name="option"
        value={option}
        onChange={fileHandler}
        placeholder="옵션을 작성하세요"
      />
      <input
        type="text"
        name="price"
        onChange={fileHandler}
        value={price}
        placeholder="가격을 작성하세요"
      />
      <input type="file" name="file" onChange={fileHandler} />
      {isLoading ? "로딩 중..." : <input type="submit" value="업로드" />}
    </form>
  );
}
