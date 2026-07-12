import ingredientReducer, {
  getIngredients,
  initialState
} from '../ingridientsSlice';

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  }
];

const mockError = new Error('произошла ошибка');

const expectedPendingState = {
  ...initialState,
  isLoading: true,
  errors: null
};

const expectedFulfilledState = {
  ...initialState,
  isLoading: false,
  items: mockIngredients
};

const expectedRejectedState = {
  ...initialState,
  isLoading: false,
  errors: mockError.message
};

describe('тестируем редюсер ingredients', () => {
  test('проверка несуществующего экшена, возвращает начальное состояние', () => {
    const newState = ingredientReducer(undefined, { type: 'UNKNOWN' });
    expect(newState).toEqual(initialState);
  });

  test('проверка сотояния pending', () => {
    const newState = ingredientReducer(
      initialState,
      getIngredients.pending('')
    );
    expect(newState).toEqual(expectedPendingState);
  });

  test('проверка сотояния fulfilled', () => {
    const newState = ingredientReducer(
      initialState,
      getIngredients.fulfilled(mockIngredients, '')
    );
    expect(newState).toEqual(expectedFulfilledState);
  });

  test('проверка сотояния rejected', () => {
    const newState = ingredientReducer(
      initialState,
      getIngredients.rejected(mockError, '')
    );
    expect(newState).toEqual(expectedRejectedState);
  });
});
