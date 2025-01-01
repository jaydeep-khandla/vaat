import React from "react";
import styles from "./Navbar.module.css";
import Button from "../Button";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarContent}>
          <div className={styles.navbarLinks}>
            <a href="" className={styles.navbarLogo}>
              {"VAAT"}
            </a>
            <div className={styles.navbarLinkGroup}>
              <a href="" className={styles.navLink}>
                {"Features"}
              </a>
              <a href="" className={styles.navLink}>
                {"Pricing"}
              </a>
              <a href="" className={styles.navLink}>
                {"Support"}
              </a>
            </div>
          </div>
          <div className={styles.navbarAuthButtons}>
            <Button variant="ghost" className={styles.btnLogin}>
              {"Login"}
            </Button>
            <Button variant="default">{"Sign Up for free"}</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
