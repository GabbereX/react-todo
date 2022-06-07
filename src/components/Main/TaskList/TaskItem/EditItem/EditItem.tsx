import React, { FC } from 'react';
import styles from './EditItem.module.scss';
import { ITask } from '../../../../../interfaces/ITasks';
import Modal from '../../../../../ui/Modal/Modal';
import { setStatusPostData } from '../../../../../store/reducers/api/postData';
import { useAppDispatch } from '../../../../../hooks/redux';
import EditItemForm from './EditItemForm/EditItemForm';

interface IProps {
  task: ITask;
}

const EditItem: FC<IProps> = ({ task }) => {
  const { id, status, text, email, username } = task;
  const dispatch = useAppDispatch();

  const additionalActions = () => {
    setTimeout(() => {
      // dispatch(setStatusPostData(''));
    }, 1300);
  };

  return (
    <Modal
      button={
        <button className={`${styles.editButton} defaultButton`}>Edit</button>
      }
      keyValue={`task_${id}`}
      title={'Редактирование задания'}
      additionalActions={additionalActions}
      status={''}
      successMessage={'Задание успешно отредактировано'}
    >
      <EditItemForm task={task} />
    </Modal>
  );
};

export default EditItem;
