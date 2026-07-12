import burgerConstructorReducer, {
  addIngredient,
  chooseBun,
  clearAllConstructor,
  closeModalOrder,
  initialState,
  moveIngredient,
  orderBurger,
  removeIngredient
} from '../burgerConstructorSlice';

import crypto from 'crypto';

const mockInitialState = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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

const expectedIngredientsMoved = [
  {
    id: '2',
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
    id: '1',
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
    id: '3',
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

const expectedIngredientsRemoved = [
  {
    id: '1',
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
    id: '3',
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

const idForAdd = crypto.randomUUID();
const addedIngredient = {
  id: idForAdd,
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  __v: 0
};

const expectedIngredientsAdded = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
  },
  {
    id: idForAdd,
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0
  }
];

const chosenBun = {
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
};

const mockOrderData = {
  _id: '6a5127cd6a172d001b98f87d',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa0940',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Метеоритный флюоресцентный люминесцентный бургер',
  createdAt: '2026-07-10T17:11:41.558Z',
  updatedAt: '2026-07-10T17:11:41.643Z',
  number: 107974
};

const initialConstructorState = {
  ...initialState,
  ingredients: mockInitialState
};

const expectedPendingState = {
  ...initialState,
  error: null,
  orderRequest: true
};

const mockFulilledOrder = {
  success: true,
  name: 'Антарианский флюоресцентный люминесцентный минеральный бургер',
  order: {
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa093d'
    ],
    _id: '6a514a7f6a172d001b98f8a0',
    owner: {
      name: 'Ab',
      email: 'shtirlietz@mail.ru',
      createdAt: '2026-06-29T16:16:23.097Z',
      updatedAt: '2026-07-01T16:36:03.176Z'
    },
    status: 'done',
    name: 'Антарианский флюоресцентный люминесцентный минеральный бургер',
    createdAt: '2026-07-10T19:39:43.565Z',
    updatedAt: '2026-07-10T19:39:43.645Z',
    number: 107978,
    price: 3352
  }
};

const expectedFulfilledState = {
  ...initialState,
  orderModalData: mockFulilledOrder.order,
  orderRequest: false
};

const mockError = new Error('ошибка');
const expectedRejectedState = {
  ...initialState,
  error: mockError.message,
  orderRequest: false
};

describe('тестируем редюсер burgerConstructor', () => {
  test('проверка несуществующего экшена', () => {
    const newState = burgerConstructorReducer(undefined, { type: 'UNKNOWN' });
    expect(newState).toEqual(initialState);
  });

  test('проверка перемещения ингредиента', () => {
    const newState = burgerConstructorReducer(
      initialConstructorState,
      moveIngredient({ from: 0, to: 1 })
    );
    expect(newState.ingredients).toEqual(expectedIngredientsMoved);
  });

  test('проверка удаления ингредиента', () => {
    const newState = burgerConstructorReducer(
      initialConstructorState,
      removeIngredient('2')
    );
    expect(newState.ingredients).toEqual(expectedIngredientsRemoved);
  });

  test('проверка очистки всего конструктора', () => {
    const newState = burgerConstructorReducer(
      initialConstructorState,
      clearAllConstructor()
    );
    expect(newState).toEqual(initialState);
  });

  test('проверка добавления ингредиента', () => {
    jest.spyOn(global.crypto, 'randomUUID').mockReturnValueOnce(idForAdd);
    const newState = burgerConstructorReducer(
      initialConstructorState,
      addIngredient(addedIngredient)
    );
    expect(newState.ingredients).toEqual(expectedIngredientsAdded);
  });

  test('проверка выбора булки', () => {
    jest.spyOn(global.crypto, 'randomUUID').mockReturnValueOnce(idForAdd);
    const newState = burgerConstructorReducer(
      initialConstructorState,
      chooseBun(chosenBun)
    );
    const expectedBun = { ...chosenBun, id: idForAdd };
    expect(newState.bun).toEqual(expectedBun);
  });

  test('проверка очистки модального окна', () => {
    const initialOrderState = {
      ...initialConstructorState,
      orderModalData: mockOrderData
    };
    const newState = burgerConstructorReducer(
      initialOrderState,
      closeModalOrder()
    );
    expect(newState.orderModalData).toEqual(initialState.orderModalData);
  });

  test('проверка состояния pending', () => {
    const newState = burgerConstructorReducer(
      initialState,
      orderBurger.pending('')
    );
    expect(newState).toEqual(expectedPendingState);
  });

  test('проверка состояния fulfilled', () => {
    const newState = burgerConstructorReducer(
      initialState,
      orderBurger.fulfilled(mockFulilledOrder, '')
    );
    expect(newState).toEqual(expectedFulfilledState);
  });

  test('проверка состояния rejected', () => {
    const newState = burgerConstructorReducer(
      initialState,
      orderBurger.rejected(mockError, '')
    );
    expect(newState).toEqual(expectedRejectedState);
  });
});
