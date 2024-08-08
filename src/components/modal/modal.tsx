import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModal {
  header: string;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({
  header,
  onClose,
  children
}:IModal) {
  React.useEffect(() => {
    const escClick = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", escClick);
    return () => {
      window.removeEventListener("keydown", escClick);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <h2 className={styles.heading}>{header}</h2>
        <span id="closeModal" className={styles.close} onClick={onClose}>
          <CloseIcon  type = "primary"/>
        </span>
          {children}
      </div>
      <ModalOverlay onClick={onClose}></ModalOverlay>
    </>,
    modalRoot
  );
}