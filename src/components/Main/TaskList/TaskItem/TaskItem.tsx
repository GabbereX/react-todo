import React, { FC } from 'react';
import styles from './TaskItem.module.scss';
import { ITask } from '../../../../interfaces/ITasks';
import { useAppSelector } from '../../../../hooks/redux';
import EditItem from './EditItem/EditItem';
import Person from "./Person/Person";

interface IProps {
  task: ITask;
}

const TaskItem: FC<IProps> = ({ task }) => {
  const { status, text, email, username } = task;
  const { message } = useAppSelector(state => state.getToken);

  return (
    <li className={styles.taskItem}>
      <div className={styles.top}>
        <Person email={email || ''} username={username || ''} />
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
      {message.token && <EditItem task={task} />}
    </li>
  );
};

export default TaskItem;
