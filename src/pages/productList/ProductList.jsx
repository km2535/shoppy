import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  nextProductList,
  prevProductList,
  productList,
} from "../../server/fireStore";
import styles from "./ProductList.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function ProductList() {
  const navigate = useNavigate();
  const [lastPage, setLastPage] = useState(false);
  const [firstPage, setFirstPage] = useState(false);
  const [product, setProduct] = useState([]);
  // 페이지네이션의 규칙에 따라 보여주는 제품의 갯수를 한정
  useEffect(() => {
    productList(setFirstPage).then((v) => setProduct(v));
  }, []);
  const nextHandler = () => {
    setFirstPage(false);
    nextProductList(setLastPage, setFirstPage).then(
      (v) => v?.length !== 0 && v !== undefined && setProduct(v)
    );
  };
  const prevHandler = () => {
    setLastPage(false);
    prevProductList(setFirstPage).then(
      (v) => v?.length !== 0 && v !== undefined && setProduct(v)
    );
  };

  const detailPageHandler = (item) => {
    navigate(`/product/${item.id}`, { state: item });
  };

  return (
    <>
      <div className={styles.container}>
        {product?.map((item) => (
          <div key={item.id} className={styles.content}>
            <div
              onClick={() => detailPageHandler(item)}
              className={styles.card}
            >
              <div className={styles.imgContent}>
                <img className={styles.img} src={item.value.imgUrl} alt="" />
              </div>
              <div className={styles.description}>
                <div className={styles.title}>{item.value.name}</div>
                <div className={styles.title}>￦{item.value.price}</div>
              </div>
              <div className={styles.gender}>{item.value.gender}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.moveBtn}>
        {firstPage || (
          <div className={styles.prevBtn} onClick={prevHandler}>
            <AiOutlineLeft />
          </div>
        )}
        {lastPage || (
          <div className={styles.nextBtn} onClick={nextHandler}>
            <AiOutlineRight />
          </div>
        )}
      </div>
    </>
  );
}
