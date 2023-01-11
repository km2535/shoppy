import React from "react";
import { useNavigate } from "react-router-dom";
import { firebaseLogout, googleLogin } from "../../server/login";
import { useAuthContext } from "../context/AuthContext";
import styles from "./Navbar.module.css";
import { FiShoppingBag, FiShoppingCart, FiEdit } from "react-icons/fi";
import { useTotalCartContext } from "../context/TotalCartContext";

export default function Navbar() {
  const { fbuser } = useAuthContext();
  const { total } = useTotalCartContext();
  const navigate = useNavigate();

  const loginHandler = () => {
    googleLogin();
  };
  const logoutHandler = () => {
    firebaseLogout();
  };
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <div className={styles.logo}>
          <li onClick={() => navigate("/")} className={styles.icon}>
            <FiShoppingBag />
            Shoppy
          </li>
        </div>
        <div className={styles.info}>
          <li className={styles.products} onClick={() => navigate("/products")}>
            Products
          </li>
          {fbuser ? (
            <>
              {fbuser?.isAdmin ? (
                <>
                  <li
                    onClick={() => navigate("/shopingList")}
                    className={styles.products}
                  >
                    <FiShoppingCart />
                  </li>
                  <div className={styles.totalCnt}>{total}</div>
                  <li
                    onClick={() => navigate("/product/addProduct")}
                    className={styles.products}
                  >
                    <FiEdit />
                  </li>
                </>
              ) : (
                ""
              )}
              <li>
                <img src={fbuser.photoURL} alt="" className={styles.img} />
              </li>
              <li className={styles.name}>{fbuser.displayName}</li>

              <input
                className={styles.btn}
                type={"button"}
                value={"Logout"}
                onClick={logoutHandler}
              />
            </>
          ) : (
            <input
              className={styles.btn}
              type={"button"}
              value={"Login"}
              onClick={loginHandler}
            />
          )}
        </div>
      </ul>
    </nav>
  );
}
