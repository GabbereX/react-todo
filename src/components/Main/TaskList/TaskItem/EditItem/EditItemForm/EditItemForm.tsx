import React, {FC, FormEvent} from 'react';
import { ITask } from '../../../../../../interfaces/ITasks';

interface IProps {
  task: ITask;
}

const EditItemForm: FC<IProps> = ({ task }) => {
  const { id, status, text, email, username } = task;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const task = {
      username,
      email,
      text,
    };

    // dispatch(postAPI(task));
  };

  return <form onSubmit={handleSubmit} style={{ position: 'relative' }}>

  </form>;
};

export default EditItemForm;
