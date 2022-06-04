import React, { FC, useState } from 'react';
import styles from './Sort.module.scss';
import Arrow from '../../../../icons/Arrow/Arrow';
import DropDown from '../../../../ui/DropDown/DropDown';
import SortList from './SortList/SortList';
import { useDispatch } from 'react-redux';
import {
  setSortField,
  setSortDirection,
} from '../../../../store/reducers/params';
import { useAppSelector } from '../../../../hooks/redux';

const Sort: FC = () => {
  const { sortDirection } = useAppSelector(state => state.params);
  const [sortCheckedId, setSortCheckedId] = useState<number>(0);
  const sortList = [
    { name: 'по дате', param: 'id' },
    { name: 'по логину', param: 'username' },
    { name: 'по почте', param: 'email' },
    { name: 'по статусу', param: 'status' },
  ];

  const dispatch = useDispatch();

  const handleClick = (id: number) => {
    setTimeout(() => {
      setSortCheckedId(id);
    }, 100);

    dispatch(setSortField(sortList[id].param));

    if (sortCheckedId === id) {
      dispatch(setSortDirection(!sortDirection));
    } else {
      dispatch(setSortDirection(true));
    }
  };

  return (
    <div className={styles.sortContainer}>
      <button
        className={styles.sortAscDescButton}
        onClick={() => dispatch(setSortDirection(!sortDirection))}
      >
        <Arrow askDesk={sortDirection} />
      </button>
      <div className={styles.sortSort}>
        Сортировать
        <DropDown
          button={
            <button className={styles.sortSortButton}>
              {sortList[sortCheckedId].name}
            </button>
          }
          keyValue={'dropDownSort'}
        >
          <SortList
            sortList={sortList}
            handleClick={handleClick}
            sortChechedId={sortCheckedId}
          />
        </DropDown>
      </div>
    </div>
  );
};

export default Sort;
