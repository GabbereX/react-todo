import React, { ChangeEvent, FC, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { postAPI } from '../../../../store/reducers/postData';
import {
  emailField,
  textField,
  usernameField,
} from '../../../../store/reducers/forms/addTaskFields';
import ModalForm from '../../../../ui/ModalForm/ModalForm';

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
      username,
      email,
      text,
    };

    dispatch(postAPI(task));
  };

  return (
    <ModalForm
      fields={fields}
      handleSubmit={handleSubmit}
      answer={{ isLoading, status, message }}
    />
  );
};

export default AddTask;
