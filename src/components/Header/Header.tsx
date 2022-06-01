import React, { FC } from 'react';
import styles from './Header.module.scss';
import Logo from "../../icons/Logo/Logo";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.headerLogo}>
          <Logo />
          <div className={styles.headerLogoText}>
            Simple Todo
          </div>
        </div>
        <a href='#' className={styles.headerAuth}>
          Login
        </a>
      </div>
    </header>
  );
};

export default Header;
