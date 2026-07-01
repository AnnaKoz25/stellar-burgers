import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PublicRoute } from '../protectedRoutes/publicRoute';
import { ProtectedRoute } from '../protectedRoutes/protectedRoute';
import { useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { getUser, getUserSelector } from '../../services/slices/userSlice';
import { getIngredients } from '../../services/slices/ingridientsSlice';
const App = () => {
  const location = useLocation();
  const bgLocation = location.state?.background;
  const navigate = useNavigate();
  const closeModalHandler = () => {
    navigate(bgLocation?.pathname || '/');
  };
  const dispatch: AppDispatch = useDispatch();
  const { user, isAuthChecked } = useSelector(getUserSelector);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    //чтобы при перезагрузке данные профиля не обнулялись
    if (!isAuthChecked && !user) {
      dispatch(getUser());
    }
  }, [dispatch, user, isAuthChecked]);
  const orderNumber = location.pathname.split('/').pop() || '';
  const ingredientDetailsTitle = 'Детали ингредиента';
  const ordersTitle = '#' + orderNumber;
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={bgLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                {ingredientDetailsTitle}
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                {ordersTitle}
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  {ordersTitle}
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {bgLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={ordersTitle} onClose={closeModalHandler}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={ingredientDetailsTitle} onClose={closeModalHandler}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={ordersTitle} onClose={closeModalHandler}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
