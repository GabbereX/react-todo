import React, { FC } from 'react';
import styles from './TaskItem.module.scss';
import { ITask } from '../../../../interfaces/ITasks';

interface IProps {
  task: ITask;
}

const TaskItem: FC<IProps> = ({ task }) => {
  const { status, text, email, username } = task;

  return (
    <li className={styles.taskItem}>
      <div className={styles.top}>
        <span className={styles.topUsername}>{username}</span>
        <span className={styles.topSeparator}>|</span>
        <a href={`mailto:${email}`} className={styles.topEmail}>
          {email}
        </a>
      </div>
      <div className={styles.center}>{text}</div>
      <div
        className={styles.bottom}
        style={{
          background:
            (status === 0 || status) && status < 10 ? '#ffc0c0' : '#a5ff8b',
        }}
      >
        {(status === 0 && 'Задача не выполнена') ||
          (status === 1 && 'Задача не выполнена, отредактирована админом') ||
          (status === 10 && 'Задача выполнена') ||
          (status === 11 && 'Задача отредактирована админом и выполнена')}
      </div>
    </li>
  );
};

export default TaskItem;
