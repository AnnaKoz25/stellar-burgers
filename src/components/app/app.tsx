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
import { useDispatch, useSelector } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import { getUser, getUserSelector } from '../../services/slices/userSlice';

const App = () => {
  const location = useLocation();
  const bgLocation = location.state?.background;
  const navigate = useNavigate();
  const closeModalHandler = () => {
    navigate(-1);
  };
  const dispatch = useDispatch();
  const { user } = useSelector(getUserSelector);
  useEffect(() => {
    //чтобы при перезагрузке данные профиля не обнулялись

    if (getCookie('accessToken') && !user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);
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
              <ResetPassword />{' '}
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <p className='text text_type_main-large'>
                {ingredientDetailsTitle}
              </p>
              <IngredientDetails />{' '}
            </div>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <p className='text text_type_main-large'>{ordersTitle}</p>
              <OrderInfo />{' '}
            </div>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}
              >
                <p className='text text_type_main-large'>{ordersTitle}</p>
                <OrderInfo />{' '}
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
