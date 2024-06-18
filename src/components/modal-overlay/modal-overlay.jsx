import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ onClick}) {
  const overlay = React.useRef(null);

  React.useEffect(() => {
    const handleOverlayClick = (e) => {
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
