import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nextProductList, productList } from "../../server/fireStore";

export default function ProductList() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  // 페이지네이션의 규칙에 따라 보여주는 제품의 갯수를 한정
  useEffect(() => {
    productList().then((v) => setProduct(v));
  }, []);
  const nextHandler = () => {
    nextProductList().then(
      (v) => v?.length !== 0 && v !== undefined && setProduct(v)
    );
  };
  const detailPageHandler = (item) => {
    navigate(`/product/${item.id}`, { state: item });
  };
  return (
    <>
      <div>
        {product?.map((item) => (
          <div key={item.id}>
            <div onClick={() => detailPageHandler(item)}>{item.value.name}</div>
          </div>
        ))}
      </div>
      <div onClick={nextHandler}>nextPage</div>
    </>
  );
}
