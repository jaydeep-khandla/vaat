import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Button from '../Button';
import {
  PopoverRoot,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../Popover';
import { MenuIcon, MinusIcon } from '@/components/icons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const handleMobileMenuToggle = React.useCallback(() => {
  //   setMobileMenuOpen((prev) => !prev);
  // }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarContent}>
          <div className={styles.navbarLinks}>
            <a href='' className={styles.navbarLogo}>
              {'VAAT'}
            </a>
            <div className={styles.navbarLinkGroup}>
              <a href='' className={styles.navLink}>
                {'Features'}
              </a>
              <a href='' className={styles.navLink}>
                {'Pricing'}
              </a>
              <a href='' className={styles.navLink}>
                {'Support'}
              </a>
            </div>
          </div>
          <div className={styles.navbarAuthButtons}>
            <Button variant='ghost' className={styles.btnLogin}>
              {'Login'}
            </Button>
            <Button variant='default' className={styles.btnSignup}>
              {'Sign Up for free'}
            </Button>

            <div className={styles.mobileMenuButton}>
              <PopoverRoot>
                <PopoverTrigger
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  {/* <MenuIcon className={styles.mobileMenuIcon} /> */}
                  {/* <MenuIcon />
                  {mobileMenuOpen && (
                    <MinusIcon className={styles.mobileMenuIcon} />
                  )}
                  {!mobileMenuOpen && (
                    <MenuIcon className={styles.mobileMenuIcon} />
                  )}
                  {mobileMenuOpen ? (
                    <MinusIcon className={styles.mobileMenuIcon} />
                  ) : (
                    <MenuIcon className={styles.mobileMenuIcon} />
                  )} */}
                  {/* <div>
                    {mobileMenuOpen ? (
                      <MenuIcon className={styles.mobileMenuIcon} />
                    ) : (
                      <MenuIcon className={styles.mobileMenuIcon} />
                    )}
                  </div> */}
                  <Button variant='ghost' size='icon'>
                    <MenuIcon className={styles.mobileMenuIcon} />
                  </Button>
                </PopoverTrigger>
                <Popover
                  visible={mobileMenuOpen}
                  onClose={() => setMobileMenuOpen(false)}
                  className={styles.mobileMenuPopover}
                  align='top-right'
                  offset={40}
                >
                  <PopoverContent className={styles.mobileMenuContent}>
                    <a href='' className={styles.mobileNavLink}>
                      Features
                    </a>
                    <a href='' className={styles.mobileNavLink}>
                      Pricing
                    </a>
                    <a href='' className={styles.mobileNavLink}>
                      Support
                    </a>
                    <Button variant='outline' className={styles.mobileBtnLogin}>
                      {'Login'}
                    </Button>
                    <Button variant='default'>{'Sign Up for free'}</Button>
                  </PopoverContent>
                </Popover>
              </PopoverRoot>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
