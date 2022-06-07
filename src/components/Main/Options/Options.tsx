import React, { FC } from 'react';
import styles from './Options.module.scss';
import Modal from '../../../ui/Modal/Modal';
import AddTaskForm from './AddTaskForm/AddTaskForm';
import Sort from './Sort/Sort';
import { setStatusPostData } from '../../../store/reducers/api/postData';
import { setClearTaskFields } from '../../../store/reducers/forms/addTaskFields';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchAPI } from '../../../store/reducers/api/getData';

const Options: FC = () => {
  const { status } = useAppSelector(state => state.postData);
  const params = useAppSelector(state => state.params);
  const dispatch = useAppDispatch();

  const additionalActions = () => {
    setTimeout(() => {
      dispatch(setStatusPostData(''));
    }, 1300);
    dispatch(fetchAPI(params));
    dispatch(setClearTaskFields());
  };

  return (
    <div className={styles.options}>
      <Modal
        button={<button className='defaultButton'>Новое задание</button>}
        keyValue={'newTask'}
        title={'Добавить новое задание'}
        additionalActions={additionalActions}
        status={status}
        successMessage={'Новое задание успешно добавлено'}
      >
        <AddTaskForm />
      </Modal>
      <Sort />
    </div>
  );
};

export default Options;
