import styles from './nav-item.modules.css';

export default function NavItem(props) {
  return (
    <>
      <a href="/" className={styles.link}>    
        <span className={styles.icon}>
          {props.children}
        </span>
        <p className={styles.text}>{props.text}</p>  
      </a>
    </>
  );
}
