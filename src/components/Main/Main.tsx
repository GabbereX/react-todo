import React, { FC, useEffect } from 'react';
import styles from './Main.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAPI } from '../../store/reducers/getData';
import { ITasks } from '../../interfaces/ITasks';
import AddTask from './AddTask/AddTask';

const Main: FC = () => {
  const { isLoading, status, message } = useAppSelector(state => state.getData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);

  const checkError = (status: string, message: ITasks | string) => {
    if (typeof message === 'string' && status === 'error') {
      return <div>{message}</div>;
    }

    if (typeof message === 'object') {
      return message.total_task_count === '0' ? (
        <div>Список заданий пуст</div>
      ) : (
        message.tasks?.map(task => {
          return <div key={task.id}>Task</div>;
        })
      );
    }
  };

  return (
    <main className={styles.main}>
      <div className={`${styles.mainContainer} container`}>
        <AddTask />
        {!isLoading ? checkError(status, message) : <div>Загрузка</div>}
      </div>
    </main>
  );
};

export default Main;
