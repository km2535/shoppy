import React, { useEffect, useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteCart, updateBocket } from "../../server/database";
import styles from "./shopingItem.module.css";

export default function ShopingItem({ product, uid, reReader }) {
  const { id, name, price, size, imgUrl, count } = product;
  const [cnt, setCnt] = useState(count);
  const deleteHandler = () => {
    deleteCart(uid, id).then(() => {
      reReader();
    });
  };
  useEffect(() => {
    //setCnt(cnt);
    updateBocket(uid, id, cnt);
  }, [uid, id, cnt]);
  return (
    <div className={styles.container}>
      <div className={styles.imgContent}>
        <img className={styles.img} src={imgUrl} alt="" />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.size}>{size}</p>
        <p className={styles.price}>￦{price}</p>
      </div>
      <div className={styles.quantity}>
        <div
          className={styles.plus}
          onClick={() => setCnt((prev) => (prev > 1 ? prev - 1 : 1))}
        >
          <AiOutlineMinusSquare />
        </div>
        <div className={styles.cnt}>{cnt}</div>
        <div
          className={styles.minus}
          onClick={() => setCnt((prev) => prev + 1)}
        >
          <AiOutlinePlusSquare />
        </div>
        <div className={styles.trash} onClick={deleteHandler}>
          <BsFillTrashFill />
        </div>
      </div>
    </div>
  );
}
