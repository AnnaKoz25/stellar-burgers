import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  getIngredientsSelectors
} from '../../services/slices/ingridientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>(); //из url
  const { items } = useSelector(getIngredientsSelectors); //из списка продуктов с сервера
  const ingredientData = items.find((el) => el._id === id);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!items.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, items.length]);
  if (!ingredientData) {
    return <Preloader />;
  } else {
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
