import { AppDispatch, useSelector, useDispatch } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import {
  getIngredients,
  getIngredientsSelectors
} from '../../services/slices/ingridientsSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменные из стора */
  const { isLoading, errors, items } = useSelector(getIngredientsSelectors);
  const isIngredientsLoading = isLoading;
  const ingredients = items;
  const error = errors;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        {' '}
        {/*перенесли из App, а там просто маршрут на эту страницу */}
        {isIngredientsLoading ? (
          <Preloader />
        ) : error ? (
          <div className={`${styles.error} text text_type_main-medium pt-4`}>
            {error}
          </div>
        ) : ingredients.length > 0 ? (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        ) : (
          <div className={`${styles.title} text text_type_main-medium pt-4`}>
            Нет ингредиентов
          </div>
        )}
      </div>
    </main>
  );
};
