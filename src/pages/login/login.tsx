//login - страница авторизации.
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "../../hooks/useReducer";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { TLogin } from "../../data/apis/user-api/user-types";
import { postLogin } from "../../data/apis/user-api/user-api";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginError = useSelector((state) => state.user.requestError);

  const sendLoginForm = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      postLogin(
        {
          'email': email,
          'password': password
        } as TLogin,
        () => navigate('/')
      )
      );
  };

  return (
    <div className={styles.content}>
      <h2 className="text text_type_main-large mb-6">Вход</h2>
      <form className={styles.form} onSubmit={sendLoginForm}>
        <EmailInput
          value={email}
          name="email"
          placeholder="E-mail"
          extraClass="mb-6"
          onChange={(e) => setEmail(e.target.value)}
          aria-errormessage={loginError}
          data-test='email'
        />
        <PasswordInput
          value={password}
          name="password"
          placeholder="Пароль"
          extraClass="mb-6"
          onChange={(e) => setPassword(e.target.value)}
          data-test='password'
        />
        <Button id='loginBtn'
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вы - новый пользователь?
        <Link to="/register" className={styles.link}>
          {" "}
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?
        <Link to="/forgot-password" className={styles.link}>
          {" "}
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}
