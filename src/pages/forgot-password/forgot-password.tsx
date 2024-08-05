import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/useReducer";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { userApi } from "../../services/actions/user";
import { useLocation } from "react-router-dom";
import { postForgot } from "../../data/apis/user-api/user-api";
//import { TUserApi } from "../../components/utils/types";

//forgot-password - страница восстановления пароля.
export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");

  const forgotError = useSelector((state) => state.user.requestError);

  const sendForgotPassForm = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      postForgot(email,
        () => navigate("/reset-password", { state: { from: location } })
      )
    );
    /*dispatch(
      //@ts-ignore
      userApi(
        "forgot",
        {
          'email': email,
        },
        () => navigate("/reset-password", { state: { from: location } })
      )
    );*/
  };

  return (
    <div className={styles.content}>
      <h2 className="text text_type_main-large mb-6">Восстановление пароля</h2>
      <form onSubmit={sendForgotPassForm} className={styles.form}>
        <EmailInput
          value={email}
          name="email"
          placeholder="Укажите e-mail"
          extraClass="mb-6"
          onChange={(e) => setEmail(e.target.value)}
          aria-errormessage={forgotError}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
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
