import React from "react";
import styles from "./joinPage.module.css";
import Button from "@/components/ui/Button";
import { MicIcon, VideoIcon } from "@/components/icons";

function Navbar() {
  return (
    <nav className={styles.joinpage__navbar}>
      <h1 className={styles.logo__text}>{"VAAT"}</h1>
    </nav>
  );
}

export default function JoinPage() {
  return (
    <div className={styles.joinPage__container}>
      <Navbar />
      <main className={styles.joinPage}>
        <div className={styles.joinPage__leftSection}>
          <div className={styles.joinPage__controls}>
            <div className={styles.joinPage__buttons}>
              <Button className={styles.joinPage__button}>
                <MicIcon />
              </Button>
              <Button className={styles.joinPage__button}>
                <VideoIcon />
              </Button>
            </div>
          </div>
          <Button className={styles.joinPage__joinButton}>Join</Button>
        </div>

        <div className={styles.joinPage__rightSection}>
          <div></div>
        </div>
      </main>
    </div>
  );
}
