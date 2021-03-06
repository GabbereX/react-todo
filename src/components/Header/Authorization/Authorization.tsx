import React, { FC, useEffect } from 'react';
import styles from './Authorization.module.scss';
import Modal from '../../../ui/Modal/Modal';
import LoginForm from './LoginForm/LoginForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  setStatusGetToken,
  setToken,
} from '../../../store/reducers/api/getToken';
import { setClearAuthFields } from '../../../store/reducers/forms/authorizationFields';

const Authorization: FC = () => {
  const { status, message } = useAppSelector(state => state.getToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'ok') {
      document.cookie = `token=${message.token}; max-age=86400`;
      dispatch(setToken(message.token || ''));
    }
  }, [status]);

  const additionalActions = () => {
    setTimeout(() => {
      dispatch(setStatusGetToken(''));
    }, 1300);

    dispatch(setClearAuthFields());
  };

  return (
    <>
      {message.token ? (
        <div className={styles.authSuccess}>Привет, admin</div>
      ) : (
        <Modal
          button={<button className={styles.auth}>Login</button>}
          keyValue={'authorization'}
          title={'Авторизаця'}
          additionalActions={additionalActions}
          status={status}
          successMessage={'Вы успешно вошли в аккаунт'}
        >
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default Authorization;
