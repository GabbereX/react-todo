import React, { FC } from 'react';
import styles from './SortList.module.scss';

interface IProps {
  sortList: Array<{ name: string }>;
  handleClick: (id: number) => void;
  sortChechedId: number;
}

const SortList: FC<IProps> = ({ sortList, handleClick, sortChechedId }) => {
  return (
    <div className={styles.sort}>
      <ul className={styles.sortList}>
        {sortList.map((sortItem, index) => {
          return (
            <li
              key={index}
              onClick={() => handleClick(index)}
              className={styles.sortItem}
              style={{ background: sortChechedId === index ? '#ffe368' : '' }}
            >
              {sortItem.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SortList;
