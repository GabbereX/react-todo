import React, { ChangeEvent, FC, FormEvent } from 'react';
import styles from './ModalForm.module.scss';
import SpinPreloader from '../SpinPreloader/SpinPreloader';
import { IMap } from '../../interfaces/IMap';
import { IPostDataAnswer } from '../../interfaces/IPostDataAnswer';

interface IField {
  As: string;
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => {
    payload: string;
    type: string;
  };
}

interface IProps {
  fields: Array<IField>;
  handleSubmit: (e: FormEvent) => void;
  answer: IPostDataAnswer;
}

const ModalForm: FC<IProps> = ({ fields, handleSubmit, answer }) => {
  const { isLoading, status, message } = answer;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {fields.map(({ As, id, label, value, onChange }) => {
        return (
          <div key={id} className={styles.formFieldContainer}>
            <label htmlFor={id} className={styles.formFieldLabel}>
              {label}
            </label>
            <As
              className={styles.formField}
              style={{
                borderColor:
                  (message as IMap)[id] && status === 'error' ? '#f63e31' : '',
              }}
              {...(As !== 'textarea' ? { type: 'text' } : {})}
              // @ts-ignore
              id={id}
              value={value}
              onChange={onChange}
            />
            {typeof message === 'object' && status === 'error' && (
              <div className={styles.error}>{(message as IMap)[id]}</div>
            )}
          </div>
        );
      })}
      {typeof message === 'string' && status === 'error' && (
        <div className={`${styles.error} ${styles.errorServerAnsver}`}>
          {message}
        </div>
      )}
      <button className={`defaultButton ${styles.formButton}`}>
        Отправить
      </button>
      {isLoading && <SpinPreloader />}
    </form>
  );
};

export default ModalForm;
