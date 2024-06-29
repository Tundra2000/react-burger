import { Link } from "react-router-dom";
import styles from "./not-found.module.css";

export function NotFoundPage() {
  return (
    <div className={styles.content}>
      <h2 className="text text_type_main-large mb-6">
        Упс... <br /> Error 404 Not Found
      </h2>
      <Link to="/login" className={styles.link}>
        Вернутся на главную
      </Link>
    </div>
  );
}
