import React from 'react';
import styles from './Footer.module.css';
import { FacebookIcon, LinkedInIcon, TwitterIcon } from '../../icons';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.linksWrapper}>
          <div className={styles.linksContainer}>
            <h3 className={styles.titles}>{'Products'}</h3>
            <ul className={styles.footerLinks}>
              <li className={styles.link}>{'Features'}</li>
              <li className={styles.link}>{'Pricing'}</li>
              <li className={styles.link}>{'Security'}</li>
            </ul>
          </div>
          <div className={styles.linksContainer}>
            <h3 className={styles.titles}>{'Company'}</h3>
            <ul className={styles.footerLinks}>
              <li className={styles.link}>{'About'}</li>
              <li className={styles.link}>{'Careers'}</li>
              <li className={styles.link}>{'Contact'}</li>{' '}
            </ul>
          </div>
          <div className={styles.linksContainer}>
            <h3 className={styles.titles}>{'Resources'}</h3>
            <ul className={styles.footerLinks}>
              <li className={styles.link}>{'Blog'}</li>
              <li className={styles.link}>{'Help Center'}</li>
              <li className={styles.link}>{'Community'}</li>
            </ul>
          </div>
          <div className={styles.linksContainer}>
            <h3 className={styles.titles}>{'Legal'}</h3>
            <ul className={styles.footerLinks}>
              <li className={styles.link}>{'Privacy'}</li>
              <li className={styles.link}>{'Terms'}</li>
              <li className={styles.link}>{'Cookie Policy'}</li>
            </ul>
          </div>
        </div>
        <div className={styles.socialWrapper}>
          <div className={styles.socialContainer}>
            <div className={styles.rightsContainer}>
              <img src="./logo.png" alt="VAAT" /> {/* src={images.logo} */}
              <span>{'@2030 vaat. All reights reserved'}</span>
            </div>
            <div className={styles.socialLinks}>
              <a href="#">
                <LinkedInIcon />
              </a>
              <a href="#">
                <TwitterIcon />
              </a>
              <a href="#">
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
