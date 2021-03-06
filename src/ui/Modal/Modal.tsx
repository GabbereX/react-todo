import React, {
  createRef,
  FC,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from 'react';
import styles from './Modal.module.scss';
import { CSSTransition } from 'react-transition-group';
import Close from '../../icons/Close/Close';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setStatusGetToken, setToken } from '../../store/reducers/api/getToken';
import {
  setMessageEditData,
  setStatusEditData,
} from '../../store/reducers/api/editData';

interface IModalProps {
  button: ReactNode;
  children: ReactNode;
  keyValue: string;
  title: string;
  additionalActions: () => void;
  status: string;
  successMessage: string;
}

const Modal: FC<IModalProps> = ({
  button,
  children,
  keyValue,
  title,
  additionalActions,
  status,
  successMessage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const listRef: RefObject<HTMLDivElement> = createRef();

  const { message } = useAppSelector(state => state.getToken);
  const { message: messageEditData } = useAppSelector(state => state.editData);
  const dispatch = useAppDispatch();
  const chekErrorTokenMessage =
    typeof messageEditData === 'object'
      ? messageEditData.token
      : messageEditData;

  const handleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (message.token === 'expired') {
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
      setTimeout(() => {
        dispatch(setToken(''));
        dispatch(setStatusEditData(''));
        dispatch(setMessageEditData(''));
        dispatch(setStatusGetToken(''));
      }, 1300);
    }
  }, [message]);

  useEffect(() => {
    if (status === 'ok' && isModalOpen) {
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
      additionalActions();
    }
  }, [status]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as Element).classList.contains(styles.modalContainer)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isModalOpen]);

  return (
    <div key={keyValue}>
      <div onClick={handleOpen}>{button}</div>

      <CSSTransition
        nodeRef={listRef}
        in={isModalOpen}
        timeout={300}
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}
        unmountOnExit
      >
        <div ref={listRef} className={styles.modalContainer}>
          <div className={styles.modalContent}>
            {status === 'ok' || message.token === 'expired' ? (
              <div
                className={styles.success}
                style={{ color: message.token === 'expired' ? 'red' : '' }}
              >
                {message.token === 'expired' && chekErrorTokenMessage
                  ? chekErrorTokenMessage
                  : successMessage}
              </div>
            ) : (
              <>
                <h2 className={styles.modalTitle}>{title}</h2>
                {children}
                <button
                  className={styles.modalClose}
                  onClick={() => setIsModalOpen(false)}
                >
                  <Close />
                </button>
              </>
            )}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Modal;
