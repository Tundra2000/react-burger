import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { userApi } from "../../services/actions/user";
import styles from "./register.module.css";

//register - страница регистрации.
export function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const regError = useSelector((state) => state.user.requestError);

  const regFormSend = async (e) => {
    e.preventDefault();

    dispatch(
      userApi(
        "register",
        {
          email: email,
          password: password,
          name: name,
        },
        () => navigate("/")
      )
    );
  };

  return (
    <div className={styles.content}>
      <h2 className="text text_type_main-large mb-6">Регистрация</h2>
      <form onSubmit={regFormSend} className={styles.form}>
        <Input
          value={name}
          type="text"
          name="name"
          placeholder="Имя"
          extraClass="mb-6"
          onChange={(e) => setName(e.target.value)}
          error={regError !== ""}
          errorText={regError}
        />
        <EmailInput
          value={email}
          name="email"
          placeholder="E-mail"
          extraClass="mb-6"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          value={password}
          name="password"
          placeholder="Пароль"
          extraClass="mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}
