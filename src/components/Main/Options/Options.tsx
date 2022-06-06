import React, { FC } from 'react';
import styles from './Options.module.scss';
import Modal from '../../../ui/Modal/Modal';
import AddTask from './AddTask/AddTask';
import Sort from './Sort/Sort';
import { setStatusPostData } from '../../../store/reducers/postData';
import { setClearTaskFields } from '../../../store/reducers/forms/addTaskFields';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const Options: FC = () => {
  const { status } = useAppSelector(state => state.postData);
  const dispatch = useAppDispatch();

  const clearStatusAndFields = () => {
    setTimeout(() => {
      dispatch(setStatusPostData(''));
    }, 1300);
    dispatch(setClearTaskFields());
  };

  return (
    <div className={styles.options}>
      <Modal
        button={<button className='defaultButton'>Новое задание</button>}
        keyValue={'newTask'}
        title={'Добавить новое задание'}
        clearStatusAndFields={clearStatusAndFields}
        status={status}
        successMessage={'Новое задание успешно добавлено'}
      >
        <AddTask />
      </Modal>
      <Sort />
    </div>
  );
};

export default Options;
