import React from 'react';
import Button from '@/components/ui/Button';
import { MicIcon, VideoIcon } from '@/components/icons';
import styles from './joinPage.module.css';

function Navbar() {
  return (
    <nav className={styles.joinpage__navbar}>
      <h1 className={styles.logo__text}>{'VAAT'}</h1>
    </nav>
  );
}

export default function JoinPage() {
  return (
    <div className={styles.joinPage__container}>
      <Navbar />
      <main className={styles.joinPage__main}>
        <div className={styles.joinPage__content}>
          <div className={styles.joinPage__leftSection}>
            <div className={styles.joinPage__controls}>
              <div className={styles.joinPage__buttonGroup}>
                <div className={styles.joinPage__buttonWrapper}>
                  <Button className={styles.joinPage__micButton}>
                    <MicIcon />
                  </Button>
                  <Button className={styles.joinPage__videoButton}>
                    <VideoIcon />
                  </Button>
                </div>
              </div>
              <video className={styles.joinPage__video}></video>
            </div>
            <Button size='lg' className={styles.joinPage__getMediaButton}>
              {/* {'Get Media Permissions'} */}
              Get Media Permissions
            </Button>
          </div>

          <div className={styles.joinPage__rightSection}>
            <div className={styles.joinPage__info}>
              <h1 className={styles.joinPage__title}>{'Join the Meeting'}</h1>
              <p className={styles.joinPage__description}>
                {'Set up your audio and video before joining the conference'}
              </p>
              <Button size='lg' className={styles.joinPage__joinButton}>
                {'Ask to Join'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
