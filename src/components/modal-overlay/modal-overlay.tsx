import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

interface IModalOverlay {
  onClick: () => void
}

export default function ModalOverlay({ onClick }: IModalOverlay) {
  const overlay = React.useRef(null);

  React.useEffect(() => {
    const handleOverlayClick = (e: MouseEvent) => {
      if (e.target === overlay.current) {
        onClick();
      }
    };
    document.addEventListener("click", handleOverlayClick);
    return () => {
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [onClick]);

  return (
    <div className={styles.overlay} ref={overlay}>
      
    </div>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
