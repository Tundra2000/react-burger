import { useState } from "react";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { userApi } from "../../services/actions/user";
import styles from "./reset-password.module.css";

//reset-password - страница сброса пароля.
export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const forgotError = useSelector((state:any) => state.user.requestError);

  const resetPassFormSend = async (e:any) => {
    e.preventDefault();

    dispatch(
      //@ts-ignore
      userApi(
        "reset",
        {
          password: password,
          token: code,
        },
        () => navigate("/login")
      )
    );
  };

  //ПОПАСТЬ МОЖНО ТОЛЬКО СО СТРАНИЦЫ 'forgot-password'
  let from = location.state?.from?.pathname;
  if ( from !== '/forgot-password') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className={styles.content}>
      <h2 className="text text_type_main-large mb-6">Восстановление пароля</h2>
      <form onSubmit={resetPassFormSend} className={styles.form}>
        <PasswordInput
          value={password}
          name="password"
          placeholder="Введите новый пароль"
          extraClass="mb-6"
          onChange={(e) => setPassword(e.target.value)}
          aria-errormessage={forgotError}
        />
        <Input
          value={code}
          type="text"
          name="name"
          placeholder="Введите код из письма"
          extraClass="mb-6"
          onChange={(e) => setCode(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
}
