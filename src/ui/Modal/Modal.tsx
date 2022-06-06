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
import { fetchAPI } from '../../store/reducers/getData';

interface IModalProps {
  button: ReactNode;
  children: ReactNode;
  keyValue: string;
  title: string;
  clearStatusAndFields: () => void;
  status: string;
  successMessage: string;
}

const Modal: FC<IModalProps> = ({
  button,
  children,
  keyValue,
  title,
  clearStatusAndFields,
  status,
  successMessage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const listRef: RefObject<HTMLDivElement> = createRef();
  const dispatch = useAppDispatch();
  const params = useAppSelector(state => state.params);

  const handleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (status === 'ok') {
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
      clearStatusAndFields();
      dispatch(fetchAPI(params));
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
            {status === 'ok' ? (
              <div className={styles.success}>{successMessage}</div>
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
