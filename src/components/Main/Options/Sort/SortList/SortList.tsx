import React, { FC } from 'react';
import styles from './SortList.module.scss';

interface IProps {
  sortList: Array<string>;
  handlerClick: (id: number) => void;
  sortChechedId: number;
}

const SortList: FC<IProps> = ({ sortList, handlerClick, sortChechedId }) => {
  return (
    <div className={styles.sort}>
      <ul className={styles.sortList}>
        {sortList.map((sortItem, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setTimeout(() => {
                  handlerClick(index);
                }, 100);
              }}
              className={styles.sortItem}
              style={{ background: sortChechedId === index ? '#ffe368' : '' }}
            >
              {sortItem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SortList;
