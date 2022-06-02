import React, { FC, useState } from 'react';
import styles from './Sort.module.scss';
import Arrow from '../../../../icons/Arrow/Arrow';
import DropDown from '../../../../ui/DropDown/DropDown';
import SortList from './SortList/SortList';

const Sort: FC = () => {
  const [sortCheckedId, setSortCheckedId] = useState<number>(0);
  const sortList = ['по дате', 'по логину', 'по почте', 'по статусу'];

  return (
    <div className={styles.sortContainer}>
      <button className={styles.sortAscDescButton}>
        <Arrow askDesk={'ask'} />
      </button>
      <div className={styles.sortSort}>
        Сортировать
        <DropDown
          button={
            <button className={styles.sortSortButton}>
              {sortList[sortCheckedId]}
            </button>
          }
          keyValue={'dropDownSort'}
        >
          <SortList
            sortList={sortList}
            handlerClick={(id: number) => setSortCheckedId(id)}
            sortChechedId={sortCheckedId}
          />
        </DropDown>
      </div>
    </div>
  );
};

export default Sort;
