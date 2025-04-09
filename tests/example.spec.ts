import { test, expect } from '@playwright/test';

test('Отправка формы', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByPlaceholder('Иван', { exact: true }).fill('Иван');
    await page.getByPlaceholder('Иванович').fill('Иванович');
    await page.getByPlaceholder('Иванов', { exact: true }).fill('Иванов');
    await page.getByRole('button', { name: 'Выберите дату' }).click();
    await page.getByLabel('суббота, 1 ноября 2008 г').click();
    await page.getByPlaceholder('example@gmail.com').click();
    await page.getByPlaceholder('example@gmail.com').fill('test@test.ru');
    await page.getByPlaceholder('+7 (999) 999-99-').fill('+79000000000');
    await page.getByLabel('Образование').click();
    await page
        .getByLabel('Среднее-профессиональное образование')
        .getByText('Среднее-профессиональное образование')
        .click();
    await page.getByRole('button', { name: 'Далее' }).click();
    await page.getByLabel('Оценка').click();
    await page.getByLabel('1').click();
    await page.getByRole('button', { name: 'Далее' }).click();
    await page.getByLabel('Напишите отзыв').fill('Нормик');
    await page.getByRole('button', { name: 'Отправить' }).click();
    await page.getByRole('button', { name: 'Вернуться на главную' }).click();
    await expect(page.getByText('Отзыв отправленСкрыть')).toBeVisible();
});

test('Переключение страниц', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByPlaceholder('Иван', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Оценка')).toBeHidden();
    await expect(page.getByLabel('Напишите отзыв')).toBeHidden();
    await page.getByPlaceholder('Иван', { exact: true }).fill('Иван');
    await page.getByPlaceholder('Иванович').fill('Иванович');
    await page.getByPlaceholder('Иванов', { exact: true }).fill('Иванов');
    await page.getByRole('button', { name: 'Выберите дату' }).click();
    await page.getByLabel('суббота, 1 ноября 2008 г').click();
    await page.getByPlaceholder('example@gmail.com').click();
    await page.getByPlaceholder('example@gmail.com').fill('test@test.ru');
    await page.getByPlaceholder('+7 (999) 999-99-').fill('+79000000000');
    await page.getByLabel('Образование').click();
    await page
        .getByLabel('Среднее-профессиональное образование')
        .getByText('Среднее-профессиональное образование')
        .click();
    await page.getByRole('button', { name: 'Далее' }).click();
    await expect(page.getByPlaceholder('Иван', { exact: true })).toBeHidden();
    await expect(page.getByLabel('Оценка')).toBeVisible();
    await expect(page.getByLabel('Напишите отзыв')).toBeHidden();
    await page.getByLabel('Оценка').click();
    await page.getByLabel('1').click();
    await page.getByRole('button', { name: 'Далее' }).click();
    await expect(page.getByPlaceholder('Иван', { exact: true })).toBeHidden();
    await expect(page.getByLabel('Оценка')).toBeHidden();
    await expect(page.getByLabel('Напишите отзыв')).toBeVisible();
});

test('Проверка валидации Email', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('button', { name: 'Далее' }).click();
    await page.getByPlaceholder('example@gmail.com').click();
    await page.getByPlaceholder('example@gmail.com').fill('test@test.ru');
    await expect(page.getByText('Некорректный email')).toBeHidden();
    await page.getByPlaceholder('example@gmail.com').fill('testtest.ru');
    await expect(page.getByText('Некорректный email')).toBeVisible();
    await page.getByPlaceholder('example@gmail.com').fill('@.');
    await expect(page.getByText('Некорректный email')).toBeVisible();
    await page.getByPlaceholder('example@gmail.com').fill('@test.ru');
    await expect(page.getByText('Некорректный email')).toBeVisible();
    await page.getByPlaceholder('example@gmail.com').fill('test@.ru');
    await expect(page.getByText('Некорректный email')).toBeVisible();
    await page.getByPlaceholder('example@gmail.com').fill('test@ru.');
    await expect(page.getByText('Некорректный email')).toBeVisible();
    await page.getByPlaceholder('example@gmail.com').fill('test@test.ru');
    await expect(page.getByText('Некорректный email')).toBeHidden();
});

test('Проверка валидации номера телефона', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('button', { name: 'Далее' }).click();
    await page.getByPlaceholder('+7 (999) 999-99-').fill('+79000000000');
    await expect(page.getByText('Некорректный номер телефона')).toBeHidden();
    await page.getByPlaceholder('+7 (999) 999-99-').fill('+7900000000');
    await expect(page.getByText('Некорректный номер телефона')).toBeVisible();
    await page.getByPlaceholder('+7 (999) 999-99-').fill('+790000000000');
    await expect(page.getByText('Некорректный номер телефона')).toBeVisible();
    await page.getByPlaceholder('+7 (999) 999-99-').fill('+79000000000a');
    await expect(page.getByText('Некорректный номер телефона')).toBeVisible();
    await page.getByPlaceholder('+7 (999) 999-99-').fill('+7900000000a');
    await expect(page.getByText('Некорректный номер телефона')).toBeVisible();
    await page.getByPlaceholder('+7 (999) 999-99-').fill('79000000000');
    await expect(page.getByText('Некорректный номер телефона')).toBeVisible();
    await page.getByPlaceholder('+7 (999) 999-99-').fill('a79000000000');
    await expect(page.getByText('Некорректный номер телефона')).toBeVisible();
    await page.getByPlaceholder('+7 (999) 999-99-').fill('+89000000000');
    await expect(page.getByText('Некорректный номер телефона')).toBeVisible();
});

test('Проверка валидации отчества', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByPlaceholder('Иван', { exact: true }).fill('Иван');
    await page.getByPlaceholder('Иванов', { exact: true }).fill('Иванов');
    await page.getByRole('button', { name: 'Выберите дату' }).click();
    await page.getByLabel('суббота, 1 ноября 2008 г').click();
    await page.getByPlaceholder('example@gmail.com').click();
    await page.getByPlaceholder('example@gmail.com').fill('test@test.ru');
    await page.getByPlaceholder('+7 (999) 999-99-').fill('+79000000000');
    await page.getByLabel('Образование').click();
    await page
        .getByLabel('Среднее-профессиональное образование')
        .getByText('Среднее-профессиональное образование')
        .click();
    await page.getByRole('button', { name: 'Далее' }).click();
    await page.getByLabel('Оценка').click();
    await page.getByLabel('1').click();
    await page.getByRole('button', { name: 'Далее' }).click();
    await page.getByLabel('Напишите отзыв').fill('Нормик');
    await page.getByRole('button', { name: 'Отправить' }).click();
    await page.getByRole('button', { name: 'Вернуться на главную' }).click();
    await expect(page.getByText('Отзыв отправленСкрыть')).toBeVisible();
});
