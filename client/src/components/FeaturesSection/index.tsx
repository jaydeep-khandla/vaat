import React from "react";
import styles from "./FeaturesSection.module.css";
import {
  MessagesSquareIcon,
  MonitorIcon,
  PencilIcon,
  VideoIcon,
} from "../icons";

export default function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {"Why VAAT? Your Complete Collaboration Solution"}
        </h2>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <div className={styles.iconContainer}>
              <VideoIcon className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>{"HD Video Meetings"}</h3>
            <p className={styles.featureDescription}>
              {"Crystal-clear video and audio for your group meetings."}
            </p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconContainer}>
              <MonitorIcon className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>{"Screen Sharing"}</h3>
            <p className={styles.featureDescription}>
              {"Share your screen instantly with a single click."}
            </p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconContainer}>
              <PencilIcon className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>{"Interactive Whiteboard"}</h3>
            <p className={styles.featureDescription}>
              {"Collaborate in real-time with digital whiteboarding."}
            </p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconContainer}>
              <MessagesSquareIcon className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>{"Chat & File Sharing"}</h3>
            <p className={styles.featureDescription}>
              {"Exchange messages and files seamlessly."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
