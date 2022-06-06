import React, { FC } from 'react';
import styles from './Authorization.module.scss';
import Modal from '../../../ui/Modal/Modal';
import LoginForm from './LoginForm/LoginForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setClearTaskFields } from '../../../store/reducers/forms/addTaskFields';
import { setStatusLogin } from '../../../store/reducers/login';

const Authorization: FC = () => {
  const { status } = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();

  const clearStatusAndFields = () => {
    setTimeout(() => {
      dispatch(setStatusLogin(''));
    }, 1300);
    dispatch(setClearTaskFields());
  };

  return (
    <Modal
      button={
        <button className={styles.auth}>
          Login
        </button>
      }
      keyValue={'authorization'}
      title={'Авторизаця'}
      clearStatusAndFields={clearStatusAndFields}
      status={status}
      successMessage={'Вы успешно вошли в аккаунт'}
    >
      <LoginForm />
    </Modal>
  );
};

export default Authorization;
