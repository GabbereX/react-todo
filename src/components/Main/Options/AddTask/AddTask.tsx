import React, { FC, FormEvent, useState } from 'react';
import styles from './AddTask.module.scss';

const AddTask: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = {
      username: username,
      email: email,
      message: message,
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.addTodoInputContainer}>
        <label htmlFor='username'>Введите ваше имя</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.addTodoInputContainer}>
        <label htmlFor='email'>Введите ваш Email</label>
        <input
          type='text'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.addTodoInputContainer}>
        <label htmlFor='text'>Введите ваше Сообщение</label>
        <textarea
          id='text'
          className={styles.addTodoTextarea}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      <button>Добавить</button>
    </form>
  );
};

export default AddTask;
