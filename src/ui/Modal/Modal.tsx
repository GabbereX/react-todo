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
import { useAppSelector } from '../../hooks/redux';

interface IModalProps {
  button: ReactNode;
  children: ReactNode;
  keyValue: string;
  title: string;
}

const Modal: FC<IModalProps> = ({ button, children, keyValue, title }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const listRef: RefObject<HTMLDivElement> = createRef();

  const { status } = useAppSelector(state => state.postData);

  const handleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const autoClose = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);

    return (
      <div className={styles.success}>Новое задание успешно добавлено</div>
    );
  };

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
              autoClose()
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
