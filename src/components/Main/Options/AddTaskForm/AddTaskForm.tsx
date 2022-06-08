import React, { ChangeEvent, FC, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { postAPI } from '../../../../store/reducers/api/postData';
import {
  emailField,
  textField,
  usernameField,
} from '../../../../store/reducers/forms/addTaskFields';
import ModalFields from '../../../../ui/ModalFields/ModalFields';
import SubmitButton from '../../../../ui/SubmitButton/SubmitButton';

const AddTaskForm: FC = () => {
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
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <ModalFields fields={fields} answer={{ isLoading, status, message }} />
      <SubmitButton />
    </form>
  );
};

export default AddTaskForm;
