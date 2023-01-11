import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/context/AuthContext";
import { useTotalCartContext } from "../../components/context/TotalCartContext";
import { readBocket } from "../../server/database";
import ShopingItem from "./ShopingItem";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";
import styles from "./ShopingList.module.css";

export default function ShopingList() {
  const { fbuser } = useAuthContext();
  const { totalPrice } = useTotalCartContext();
  const [orderPrice] = useState(3000);
  const [bocket, setBocket] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fbuser || navigate("/");
    readBocket(fbuser?.uid).then((v) => setBocket(v));
  }, [fbuser.uid, fbuser, navigate]);
  const reReader = () => {
    readBocket(fbuser?.uid).then((v) => setBocket(v));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.thumbnail}>내 장바구니</div>
      <form onSubmit={submitHandler} className={styles.form}>
        {bocket !== undefined &&
          bocket.map((product) => (
            <>
              <ShopingItem
                reReader={reReader}
                product={product}
                uid={fbuser?.uid}
                key={product.id}
              />
            </>
          ))}
      </form>
      <div className={styles.priceInfo}>
        <div className={styles.price}>
          <div className={styles.name}>상품총액</div>
          <div className={styles.num}>￦{totalPrice}</div>
        </div>
        <div>
          <AiFillPlusCircle />
        </div>
        <div className={styles.delivery}>
          <div className={styles.name}>배송비</div>
          <div className={styles.num}>￦{orderPrice}</div>
        </div>
        <div>
          <FaEquals />
        </div>
        <div className={styles.totalPrice}>
          <div className={styles.name}>총가격</div>
          <div className={styles.num}>￦{totalPrice + orderPrice}</div>
        </div>
      </div>
      <div className={styles.order}>
        <input className={styles.input} type="submit" value={"주문하기"} />
      </div>
    </div>
  );
}
