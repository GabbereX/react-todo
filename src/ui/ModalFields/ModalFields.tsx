import React, { ChangeEvent, FC } from 'react';
import styles from './ModalFields.module.scss';
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
  } | void;
}

interface IProps {
  fields: Array<IField>;
  answer: IPostDataAnswer;
}

const ModalFields: FC<IProps> = ({ fields, answer }) => {
  const { isLoading, status, message } = answer;
  const checkErrorMessageObject =
    typeof message === 'object' && status === 'error';
  const checkErrorMessageString =
    typeof message === 'string' && status === 'error';

  return (
    <>
      {fields.map(({ As, id, label, value, onChange }, index) => {
        return (
          <div
            key={id}
            className={styles.formFieldContainer}
            style={{ marginBottom: fields.length === index + 1 ? '40px' : '' }}
          >
            <label htmlFor={id} className={styles.formFieldLabel}>
              {label}
            </label>
            <As
              className={styles.formField}
              style={{
                borderColor: checkErrorMessageObject ? '#f63e31' : '',
              }}
              {...(As !== 'textarea'
                ? { type: id === 'password' ? 'password' : 'text' }
                : {})}
              // @ts-ignore
              id={id}
              value={value}
              onChange={onChange}
            />
            {checkErrorMessageObject && (
              <div className={styles.error}>{(message as IMap)[id]}</div>
            )}
          </div>
        );
      })}
      {checkErrorMessageString && (
        <div className={`${styles.error} ${styles.errorServerAnsver}`}>
          {message}
        </div>
      )}
      {isLoading && <SpinPreloader />}
    </>
  );
};

export default ModalFields;
