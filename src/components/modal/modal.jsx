import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals");

export default function Modal({ header, onClose, children }) {
  React.useEffect(() => {
    const escClick = (e) => {
      if (e.keyCode === 27) {
        onClose(e);
      }
    };
    window.addEventListener("keydown", escClick);

    return () => {
      window.removeEventListener("keydown", escClick);
    };
  }, [onClose]);

  // Возвращаем ReactDOM.createPortal,
  // который поместит дочерние элементы в modalRoot
  return ReactDOM.createPortal(
    <>
      
      <div className={styles.modal}>
        <h2 className={styles.heading}>{header}</h2>
        <span className={styles.close} onClick={onClose}>
          <CloseIcon />
        </span>
        <p>modal</p>
        {children}
      </div> 
      <ModalOverlay onClick={onClose}>
        <h1>ModalOverlay</h1>
      </ModalOverlay>
             
    </>,
    modalRoot
  );
}
