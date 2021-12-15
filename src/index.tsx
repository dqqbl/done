import React from "react";
import ReactDom from "react-dom";
import { Button } from "antd";
import styles from "./index.less";
import imgSmall from "@/assets/testSmall.jpg";
import imgLarge from "@/assets/testLarge.jpg";

ReactDom.render(
  <div className={styles.test}>
    <h2>Hello React!</h2>
    <img src={imgSmall} alt="" />
    <img src={imgLarge} alt="" />
    <Button type="primary">test</Button>
  </div>,
  document.getElementById("root")
);
