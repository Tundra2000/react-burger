import React, { Children } from 'react';
import styles from './modal-overlay.module.css';

export default function ModalOverlay({onClick, children}) {
    const overlay = React.useRef(null)
    
    React.useEffect(() => {
      const handleOverlayClick = (e) => {
        if (e.target === overlay.current) {
          onClick(e);
        }
      };
      document.addEventListener("click", handleOverlayClick);
  
      return () => {
        document.removeEventListener("click", handleOverlayClick);
      };
    }, [onClick]);
    
    return (
      <div className={styles.overlay} ref={overlay}>
        {children}
      </div>
    );
  }