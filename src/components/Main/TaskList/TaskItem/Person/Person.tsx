import React, { FC } from 'react';
import styles from './Person.module.scss';

interface IProps {
  email: string;
  username: string;
}

const Person: FC<IProps> = ({ email, username }) => {
  return (
    <>
      <span className={styles.personUsername}>{username}</span>
      <span className={styles.personSeparator}>|</span>
      <a href={`mailto:${email}`} className={styles.personEmail}>
        {email}
      </a>
    </>
  );
};

export default Person;
