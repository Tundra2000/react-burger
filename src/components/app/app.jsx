import AppHeader from "../app-header/app-header.jsx";
import styles from "./app.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { MainPage } from "../../pages/main/main.jsx";
import { LoginPage } from "../../pages/login/login.jsx";
import { RegisterPage } from "../../pages/register/register.jsx";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password.jsx";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password.jsx";
import { ProfilePage } from "../../pages/profile/profile.jsx";
import { OrderPage } from "../../pages/order/order.jsx";
import { UserProfilePage } from "../../pages/profile/user-profil-page/user-profil-page.jsx";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";
import { NotFoundPage } from "../../pages/not-found/not-found.jsx";
import { IngredientPage } from "../../pages/ingredient/ingredient";

function App() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.ingredients
  );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("запуск запроса");
    if (!ingredients.length) dispatch(getIngredients());
  }, [dispatch, ingredients.length]);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <div className={styles.container}>
          {ingredientsRequest ? (
            <h2>Идет загрузка данных...</h2>
          ) : ingredientsFailed ? (
            <h2>Произошла ошибка</h2>
          ) : (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />}  notAuth={true} />} />
              <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} notAuth={true} />}  />
              <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} notAuth={true} />}  />
              <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} notAuth={true} />}  />
              <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage notAuth={false} />} />} >
                <Route path='' element={<UserProfilePage />} />
                <Route path='orders' element={<NotFoundPage />} />
              </Route>
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/*" element={<NotFoundPage />} />
              <Route path='ingredients/:id' element={<IngredientPage />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
