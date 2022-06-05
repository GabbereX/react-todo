import React, { ChangeEvent, FC, FormEvent } from 'react';
import styles from './AddTask.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { postAPI } from '../../../../store/reducers/postData';
import { Map } from '../../../../interfaces/ITasks';
import SpinPreloader from '../../../../ui/SpinPreloader/SpinPreloader';
import {
  emailField,
  textField,
  usernameField,
} from '../../../../store/reducers/forms/addTaskFields';

const AddTask: FC = () => {
  const { username, email, text } = useAppSelector(
    state => state.addTaskFields
  );
  const { isLoading, status, message } = useAppSelector(
    state => state.postData
  );
  const dispatch = useAppDispatch();

  const fields = [
    {
      As: 'input',
      id: 'username',
      label: 'Имя:',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(usernameField(e.target.value)),
      value: username,
    },
    {
      As: 'input',
      id: 'email',
      label: 'Email:',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(emailField(e.target.value)),
      value: email,
    },
    {
      As: 'textarea',
      id: 'text',
      label: 'Сообщение:',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(textField(e.target.value)),
      value: text,
    },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const task = {
      username: username,
      email: email,
      text: text,
    };

    dispatch(postAPI(task));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTask}>
      {fields.map(({ As, id, label, value, onChange }) => {
        return (
          <div key={id} className={styles.addTaskFieldContainer}>
            <label htmlFor={id} className={styles.addTaskFieldLabel}>
              {label}
            </label>
            <As
              className={styles.addTaskField}
              style={{
                borderColor:
                  (message as Map)[id] && status === 'error' ? '#f63e31' : '',
              }}
              {...(As !== 'textarea' ? { type: 'text' } : {})}
              // @ts-ignore
              id={id}
              value={value}
              onChange={onChange}
            />
            {typeof message === 'object' && status === 'error' && (
              <div className={styles.error}>{(message as Map)[id]}</div>
            )}
          </div>
        );
      })}
      {typeof message === 'string' && status === 'error' && (
        <div className={`${styles.error} ${styles.errorServerAnsver}`}>
          {message}
        </div>
      )}
      <button className={`defaultButton ${styles.addTaskButton}`}>
        Отправить
      </button>
      {isLoading && <SpinPreloader />}
    </form>
  );
};

export default AddTask;
