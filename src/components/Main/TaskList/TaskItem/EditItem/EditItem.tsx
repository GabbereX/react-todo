import React, { FC } from 'react';
import styles from './EditItem.module.scss';
import { ITask } from '../../../../../interfaces/ITasks';
import Modal from '../../../../../ui/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import EditItemForm from './EditItemForm/EditItemForm';
import { setStatusEditData } from '../../../../../store/reducers/api/editData';
import { fetchAPI } from '../../../../../store/reducers/api/getData';

interface IProps {
  task: ITask;
}

const EditItem: FC<IProps> = ({ task }) => {
  const { id } = task;
  const { status } = useAppSelector(state => state.editData);
  const params = useAppSelector(state => state.params);
  const dispatch = useAppDispatch();

  const additionalActions = () => {
    setTimeout(() => {
      dispatch(setStatusEditData(''));
    }, 1300);

    dispatch(fetchAPI(params));
  };

  return (
    <Modal
      button={
        <button className={`${styles.editButton} defaultButton`}>Edit</button>
      }
      keyValue={`task_${id}`}
      title={'Редактирование задания'}
      additionalActions={additionalActions}
      status={status}
      successMessage={'Задание успешно отредактировано'}
    >
      <EditItemForm task={task} />
    </Modal>
  );
};

export default EditItem;
