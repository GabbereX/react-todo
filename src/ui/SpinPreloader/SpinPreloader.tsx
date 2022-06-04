import React, { FC } from 'react';
import styles from './SpinPreloader.module.scss';
import SpinCircle from '../../icons/SpinCircle/SpinCircle';

const SpinPreloader: FC = () => {
  return (
    <div className={styles.spinPreloader}>
      <SpinCircle />
    </div>
  );
};

export default SpinPreloader;
