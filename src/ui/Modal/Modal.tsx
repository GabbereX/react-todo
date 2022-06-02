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

interface IModalProps {
  button: ReactNode;
  children: ReactNode;
  keyValue: string;
}

const Modal: FC<IModalProps> = ({ button, children, keyValue }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const listRef: RefObject<HTMLDivElement> = createRef();

  const handleOpen = () => {
    setIsModalOpen(!isModalOpen);
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
            {children}
            <button
              className={styles.modalClose}
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Modal;
