import React, { useEffect } from "react";
import styles from "./Home.module.css";
import Header from "../header/Header";
import Products from "../products/Products";
import { useAuthContext } from "../../components/context/AuthContext";
import { readListen } from "../../server/database";
import { useTotalCartContext } from "../../components/context/TotalCartContext";

export default function Home() {
  const { fbuser } = useAuthContext();
  const { setTotalPrice, setTotal } = useTotalCartContext();
  useEffect(() => {
    fbuser && readListen(fbuser?.uid, setTotalPrice, setTotal);
  }, [fbuser, setTotalPrice, setTotal]);
  return (
    <>
      <Header />
      <section className={styles.section}>
        <Products />
      </section>
    </>
  );
}
