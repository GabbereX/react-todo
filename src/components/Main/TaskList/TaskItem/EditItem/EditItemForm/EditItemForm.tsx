import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './EditItemForm.module.scss';
import { ITask } from '../../../../../../interfaces/ITasks';
import SubmitButton from '../../../../../../ui/SubmitButton/SubmitButton';
import ModalFields from '../../../../../../ui/ModalFields/ModalFields';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { editAPI } from '../../../../../../store/reducers/api/editData';
import { setCookie } from '../../../../../../utils/setCookie';
import { setToken } from '../../../../../../store/reducers/api/getToken';
import Person from '../../Person/Person';

interface IProps {
  task: ITask;
}

const EditItemForm: FC<IProps> = ({ task }) => {
  const { id, status: statusTask, text, email, username } = task;
  const { message: messageToken } = useAppSelector(state => state.getToken);
  const { isLoading, status, message } = useAppSelector(
    state => state.editData
  );
  const [value, setValue] = useState<string>(text || '');
  const [statusTaskToggle, setStatusTastToggle] = useState<number>(
    statusTask || 0
  );
  const dispatch = useAppDispatch();

  const fields = [
    {
      As: 'textarea',
      id: 'editText',
      label: 'Сообщение:',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
      value,
    },
  ];

  const checkTextEdited = () => {
    if (statusTask === 1 || statusTask === 11) {
      return 1;
    } else if (text !== value) {
      return 1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (status === 'error') {
      setCookie('token', '', {
        'max-age': -1,
      });
      dispatch(setToken('expired'));
    }
  }, [status]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const task = {
      text: value,
      status: statusTaskToggle + checkTextEdited(),
    };

    const token = messageToken.token || '';

    id && dispatch(editAPI({ task, id, token }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <div className={styles.person}>
        <Person email={email || ''} username={username || ''} />
      </div>
      <ModalFields fields={fields} answer={{ isLoading, status, message }} />
      <div className={styles.status}>
        Статус задания:{' '}
        <span className={styles.statusButtonContainer}>
          <button
            type='button'
            className={`defaultButton ${styles.statusButton}`}
            style={
              statusTaskToggle < 10
                ? { backgroundColor: '#f63e31', color: '#fff' }
                : {}
            }
            onClick={() => setStatusTastToggle(0)}
          >
            Не выполнена
          </button>
          <button
            type='button'
            className={`defaultButton ${styles.statusButton}`}
            style={
              statusTaskToggle >= 10
                ? { backgroundColor: '#2eb704', color: '#fff' }
                : {}
            }
            onClick={() => setStatusTastToggle(10)}
          >
            Выполнена
          </button>
        </span>
      </div>
      <SubmitButton />
    </form>
  );
};

export default EditItemForm;
