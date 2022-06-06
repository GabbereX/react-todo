import React, { ChangeEvent, FC, FormEvent } from 'react';
// import styles from './LoginForm.module.scss';
import ModalForm from '../../../../ui/ModalForm/ModalForm';
import {
  passwordAuthField,
  usernameAuthField,
} from '../../../../store/reducers/forms/authorizationFields';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getTokenAPI } from '../../../../store/reducers/api/getToken';

const LoginForm: FC = () => {
  const { username, password } = useAppSelector(
    state => state.authorizationFields
  );
  const { isLoading, status, message } = useAppSelector(
    state => state.getToken
  );
  const dispatch = useAppDispatch();

  const fields = [
    {
      As: 'input',
      id: 'username',
      label: 'Логин',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(usernameAuthField(e.target.value)),
      value: username,
    },
    {
      As: 'input',
      id: 'password',
      label: 'Пароль',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(passwordAuthField(e.target.value)),
      value: password,
    },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const loginValues = {
      username,
      password,
    };

    dispatch(getTokenAPI(loginValues));
  };

  return (
    <ModalForm
      fields={fields}
      handleSubmit={handleSubmit}
      answer={{ isLoading, status, message }}
    />
  );
};

export default LoginForm;
