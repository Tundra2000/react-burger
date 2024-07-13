//login - страница авторизации.
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { userApi } from "../../services/actions/user";
import styles from "./login.module.css";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { value, handleChange } = useForm({ email: "", password: "" });

  const loginError = useSelector((state:any) => state.user.requestError);

  const sendLoginForm = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      //@ts-ignore
      userApi(
        "login",
        {
          email: email,//value.email,
          password: password//value.password,
        },
        () => navigate("/")
      )
    );
  };

  return (
    <div className={styles.content}>
      <h2 className="text text_type_main-large mb-6">Вход</h2>
      <form className={styles.form} onSubmit={sendLoginForm}>
        <EmailInput
          value={/*value.email*/email}
          name="email"
          placeholder="E-mail"
          extraClass="mb-6"
          onChange={/*handleChange*/(e) => setEmail(e.target.value)}
          aria-errormessage={loginError}
        />
        <PasswordInput
          value={/*value.password*/password}
          name="password"
          placeholder="Пароль"
          extraClass="mb-6"
          onChange={/*handleChange*/(e) => setPassword(e.target.value)}
        />
        <Button
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
