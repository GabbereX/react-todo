import React, {
  FC,
  ReactNode,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './DropDown.module.scss';
import { CSSTransition } from 'react-transition-group';

interface IDropDownProps {
  button: ReactNode;
  children: ReactNode;
  keyValue: string;
}

const DropDown: FC<IDropDownProps> = ({ button, children, keyValue }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);

  const wraperRef = useRef<HTMLDivElement>(null);
  const buttonRef: RefObject<HTMLDivElement> = createRef();
  const listRef: RefObject<HTMLDivElement> = createRef();

  const handleOpen = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !wraperRef.current?.contains(e.target)) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isDropDownOpen]);

  return (
    <div
      key={keyValue}
      onClick={handleOpen}
      ref={wraperRef}
      style={{ zIndex: '50' }}
    >
      <CSSTransition
        nodeRef={buttonRef}
        in={isChecked}
        timeout={200}
        classNames={{
          enter: styles.buttonDropDownEnter,
          enterActive: styles.buttonDropDownEnterActive,
          exit: styles.buttondropDownExit,
          exitActive: styles.buttondropDownExitActive,
        }}
      >
        <div ref={buttonRef} className={styles.button}>
          {button}
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={listRef}
        in={isDropDownOpen}
        timeout={300}
        classNames={{
          enter: styles.dropDownEnter,
          enterActive: styles.dropDownEnterActive,
          exit: styles.dropDownExit,
          exitActive: styles.dropDownExitActive,
        }}
        onExited={() => setIsChecked(false)}
        unmountOnExit
      >
        <div ref={listRef} onClick={() => setIsChecked(true)}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropDown;
