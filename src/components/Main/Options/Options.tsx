import React, { FC } from 'react';
import styles from './Options.module.scss';
import Modal from '../../../ui/Modal/Modal';
import AddTask from './AddTask/AddTask';
import Sort from "./Sort/Sort";

const Options: FC = () => {
  return (
    <div className={styles.options}>
      <Modal
        button={<button className='defaultButton'>Новое задание</button>}
        keyValue={'newTask'}
      >
        <AddTask />
      </Modal>
      <Sort />
    </div>
  );
};

export default Options;
