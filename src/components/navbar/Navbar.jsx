import React from "react";
import { useNavigate } from "react-router-dom";
import { firebaseLogout, googleLogin } from "../../server/login";
import { useAuthContext } from "../context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { fbuser } = useAuthContext();
  const navigate = useNavigate();

  const loginHandler = () => {
    googleLogin();
  };
  const logoutHandler = () => {
    firebaseLogout();
  };
  const upload = () => {
    navigate("/product/addProduct");
  };
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <div className={styles.logo}>
          <li onClick={() => navigate("/")}>logo</li>
        </div>
        <div className={styles.info}>
          <li>shopingList</li>
          {fbuser ? (
            <>
              {fbuser?.isAdmin ? <li onClick={upload}>edit</li> : ""}
              <li>
                <img src={fbuser.photoURL} alt="" />
              </li>
              <li onClick={logoutHandler}>logout</li>
            </>
          ) : (
            <li onClick={loginHandler}>login</li>
          )}
        </div>
      </ul>
    </nav>
  );
}
