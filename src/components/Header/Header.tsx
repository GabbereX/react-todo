import React, { FC } from 'react';
import styles from './Header.module.scss';
import Logo from '../../icons/Logo/Logo';
import Authorization from './Authorization/Authorization';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.headerLogo}>
          <Logo />
          <div className={styles.headerLogoText}>Simple Todo</div>
        </div>
        <Authorization />
      </div>
    </header>
  );
};

export default Header;
