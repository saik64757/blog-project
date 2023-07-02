import React from "react";
import Navbar from "../Navbar/Navbar";
import LoginCard from "../LoginCard/LoginCard";
import styles from "./Mainpage.module.css";

const Mainpage = () => {
  return (
    <div>
      <Navbar />
      <LoginCard />
    </div>
  );
};

export default Mainpage;
