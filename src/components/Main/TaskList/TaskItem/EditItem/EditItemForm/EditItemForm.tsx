import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { ITask } from '../../../../../../interfaces/ITasks';
import SubmitButton from '../../../../../../ui/SubmitButton/SubmitButton';
import ModalFields from '../../../../../../ui/ModalFields/ModalFields';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import {
  editAPI,
} from '../../../../../../store/reducers/api/editData';
import { setCookie } from '../../../../../../utils/setCookie';
import { setToken } from '../../../../../../store/reducers/api/getToken';

interface IProps {
  task: ITask;
}

const EditItemForm: FC<IProps> = ({ task }) => {
  const { id, status: statusTask, text } = task;
  const { message: messageToken } = useAppSelector(state => state.getToken);
  const { isLoading, status, message } = useAppSelector(
    state => state.editData
  );
  const [value, setValue] = useState<string>(text || '');
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
      status: statusTask,
    };

    const token = messageToken.token || '';

    id && dispatch(editAPI({ task, id, token }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <ModalFields fields={fields} answer={{ isLoading, status, message }} />
      <SubmitButton />
    </form>
  );
};

export default EditItemForm;
