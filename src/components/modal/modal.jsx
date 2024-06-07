import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ header, onClose, children }) {
  React.useEffect(() => {
    const escClick = (e) => {
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
        <span className={styles.close} onClick={onClose}>
          <CloseIcon />
        </span>
        {children}
      </div>
      <ModalOverlay onClick={onClose}></ModalOverlay>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
