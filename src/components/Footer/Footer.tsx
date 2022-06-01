import React, { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} container`}>
        © Simple Todo | {new Date().getFullYear()} Все права защищены
      </div>
    </footer>
  );
};

export default Footer;
