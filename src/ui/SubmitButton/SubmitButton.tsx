import React, {FC} from 'react';
import styles from './SubmitButton.module.scss';

const SubmitButton: FC = () => {
  return (
    <button className={`defaultButton ${styles.submitButton}`}>
      Отправить
    </button>
  );
}

export default SubmitButton;