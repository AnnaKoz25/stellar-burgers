import { test, expect } from '@playwright/test';

test.describe('проверка ингредиентов с использованием HAR', () => {
  // test('запись в HAR-файл', async ({page}) => {
  //     await page.routeFromHAR('./src/tests/hars/ingredients.har', {
  //         url: '**/ingredients',
  //         update: true
  //     })
  //     await page.goto('/');
  //     await expect(page.getByTestId('ingredients-list')).toBeVisible();
  // });

  test('добавление ингредиентов', async ({ page }) => {
    await page.routeFromHAR('./src/tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });
    await page.goto('/');
    await expect(page.getByTestId('ingredients-list')).toBeVisible();

    await page.getByTestId('add-bun').getByRole('button').first().click();
    await expect(page.getByTestId('bun-constructor-top')).toBeVisible();
    await expect(page.getByTestId('bun-constructor-bottom')).toBeVisible();

    await page.getByTestId('add-main').getByRole('button').first().click();
    await expect(page.getByTestId('constructor-main')).toBeVisible();

    await page.getByTestId('add-sauce').getByRole('button').first().click();
    await expect(page.getByTestId('constructor-sauce')).toBeVisible();
  });
});

test.describe('проверка модального окна', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./src/tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });
    await page.goto('/');
    await expect(page.getByTestId('ingredients-list')).toBeVisible();
  });
  test('вызов модального окна', async ({ page }) => {
    const ingredientTitle = await page
      .getByTestId('card')
      .first()
      .getByTestId('title-card')
      .textContent();
    await expect(ingredientTitle).not.toBeNull();
    await page.getByTestId('card').first().click();
    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByTestId('title-card-modal')).toHaveText(
      ingredientTitle as string
    );
  });
  test('проверка закрытия модального окна нажатием на кнопку-крестик', async ({
    page
  }) => {
    await page.getByTestId('card').first().click();
    await page.getByTestId('modal-close').click();
    await expect(page.getByTestId('modal')).not.toBeVisible();
  });
  test('проверка закрытия модального окна при клике на оверлей', async ({
    page
  }) => {
    await page.getByTestId('card').first().click();
    await page.mouse.click(10, 10); //через data-testid не работает из-за z-indexa 9999 у модалки
    await expect(page.getByTestId('modal')).not.toBeVisible();
  });
});

test.describe('проверка работы заказа с использованием HAR', () => {
  test('проверка успешного оформления заказа', async ({ page, context }) => {
    await page.routeFromHAR('./src/tests/hars/user.har', {
      url: '**/auth/user',
      update: false
    });

    await page.routeFromHAR('./src/tests/hars/order.har', {
      url: '**/orders',
      update: false
    });

    await context.addCookies([
      {
        name: 'accessToken',
        value: 'secret-access-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh');
    });

    await page.goto('/');
    await expect(page.getByTestId('ingredients-list')).toBeVisible();

    await page.getByTestId('add-bun').getByRole('button').first().click();
    await page.getByTestId('add-main').getByRole('button').first().click();
    await page.getByTestId('add-sauce').getByRole('button').first().click();
    await page.getByTestId('order-button').click();

    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByTestId('order-number')).toBeVisible();

    const orderNumber = await page.getByTestId('order-number').textContent();
    expect(orderNumber).toBe('108042');

    await expect(page.getByTestId('bun-constructor-top')).not.toBeVisible();
    await expect(page.getByTestId('bun-constructor-bottom')).not.toBeVisible();
    await expect(page.getByTestId('constructor-main')).not.toBeVisible();
    await expect(page.getByTestId('constructor-sauce')).not.toBeVisible();

    await page.getByTestId('modal-close').click();
    await expect(page.getByTestId('modal')).not.toBeVisible();
    await expect(page.getByTestId('order-number')).not.toBeVisible();
  });
});
