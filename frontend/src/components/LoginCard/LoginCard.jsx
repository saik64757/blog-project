import React from "react";
import styles from "./LoginCard.module.css";

const LoginCard = () => {
  return (
    <>
      <form className={styles.loginWrapper}>
        <div className={styles.logindetails}>
          <div>
            <div>UserEmail</div>
            <input type="text" />
          </div>
          <div>
            <div>PassWord</div>
            <input type="text" />
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginCard;
