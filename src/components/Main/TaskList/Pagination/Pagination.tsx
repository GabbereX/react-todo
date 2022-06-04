import React, { FC } from 'react';
import styles from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setPage } from '../../../../store/reducers/params';

interface IProps {
  taskCount?: string;
}

const Pagination: FC<IProps> = ({ taskCount }) => {
  const { page } = useAppSelector(state => state.params);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.pagination}>
      {[...new Array(taskCount && Math.ceil(+taskCount / 3))].map((_, i) => {
        const index = i + 1;
        return (
          <div
            key={index}
            className={`${styles.paginationButton} ${
              index === page && styles.active
            }`}
            onClick={() => index !== page && dispatch(setPage(index))}
          >
            <a
              className={styles.paginationLink}
              href='/'
              onClick={e => e.preventDefault()}
            >
              {index}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
