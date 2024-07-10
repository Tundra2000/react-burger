import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients.jsx";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { MainPage } from "../../pages/main/main.jsx";
import { LoginPage } from "../../pages/login/login.jsx";
import { RegisterPage } from "../../pages/register/register.jsx";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password.jsx";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password.jsx";
import { ProfilePage } from "../../pages/profile/profile.jsx";
import { OrderPage } from "../../pages/order/order.jsx";
import { UserProfilePage } from "../../pages/profile/user-profil-page/user-profil-page.jsx";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element.jsx";
import { NotFoundPage } from "../../pages/not-found/not-found.jsx";
import { IngredientPage } from "../../pages/ingredient/ingredient.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  let background = location.state && location.state.background;

  const { ingredients, ingredientsRequest, ingredientsFailed }: any = useSelector(
    (state: any) => state.ingredients
  );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("запуск запроса");
    //@ts-ignore
    if (!ingredients.length) dispatch(getIngredients());
  }, [dispatch, ingredients.length]);

  const closeModal = () => navigate(-1);

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        {ingredientsRequest ? (
          <h2>Идет загрузка данных...</h2>
        ) : ingredientsFailed ? (
          <h2>Произошла ошибка</h2>
        ) : (
          <Routes location={background || location}>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/login"
              element={
                <ProtectedRouteElement element={<LoginPage />} notAuth={true} />
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRouteElement
                  element={<RegisterPage />}
                  notAuth={true}
                />
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRouteElement
                  element={<ForgotPasswordPage />}
                  notAuth={true}
                />
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteElement
                  element={<ResetPasswordPage />}
                  notAuth={true}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={<ProfilePage />}
                  notAuth={false} 
                />
              }
            >
              <Route path="" element={<UserProfilePage />} />
              <Route path="orders" element={<NotFoundPage />} />
            </Route>
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="ingredients/:id" element={<IngredientPage />} />
          </Routes>
        )}
      </div>

      {background && (  
        <Routes>  
          <Route  
            path="/ingredients/:id"  
            element={  
              <Modal header="Детали ингредиента" onClose={closeModal}>  
                <IngredientDetails />  
              </Modal>  
            }  
          />  
        </Routes>  
      )}
    </>
  );
}

export default App;
