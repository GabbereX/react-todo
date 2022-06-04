import React, { FC } from 'react';
// import styles from './TaskList.module.scss';
import { ITasks } from '../../../interfaces/ITasks';
import TaskItem from './TaskItem/TaskItem';
import Pagination from './Pagination/Pagination';

interface IProps {
  data: ITasks;
}

const TaskList: FC<IProps> = ({ data }) => {
  const { tasks, total_task_count } = data;

  return (
    <>
      <ul>
        {tasks &&
          tasks.map(task => {
            return <TaskItem key={task.id} task={task} />;
          })}
      </ul>
      <Pagination taskCount={total_task_count} />
    </>
  );
};

export default TaskList;
