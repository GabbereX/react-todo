import React, { FC, useEffect } from 'react';
import styles from './Main.module.scss';
import { ITasks } from '../../interfaces/ITasks';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAPI } from '../../store/reducers/getData';
import Options from './Options/Options';
import TaskList from './TaskList/TaskList';

const Main: FC = () => {
  const { isLoading, status, message } = useAppSelector(state => state.getData);
  const params = useAppSelector(state => state.params);

  const dispatch = useAppDispatch();

  const checkError = (status: string, message: ITasks | string) => {
    if (typeof message === 'string' && status === 'error') {
      return <div className={styles.errorMessage}>{message}</div>;
    }

    if (typeof message === 'object') {
      return message.total_task_count === '0' ? (
        <div className={styles.errorMessage}>Список заданий пуст</div>
      ) : (
        <TaskList data={message} />
      );
    }
  };

  useEffect(() => {
    dispatch(fetchAPI(params));
  }, [params]);

  return (
    <main className={styles.main}>
      <div className={`${styles.mainContainer} container`}>
        <Options />
        {!isLoading ? checkError(status, message) : <div>Загрузка...</div>}
      </div>
    </main>
  );
};

export default Main;
