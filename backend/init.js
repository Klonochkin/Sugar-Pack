db = db.getSiblingDB('db');

db.product.insertMany([
    {
        name: 'Типовая упаковка',
        quantity: '9шт',
        image: 'cardImage1.jpg',
        path: 'tipovaya-upakovka',
    },
    {
        name: 'Пищевая упаковка',
        quantity: '7шт',
        image: 'cardImage2.jpg',
        path: 'pishhevaya-upakovka',
    },
    {
        name: 'Блистерная упаковка',
        quantity: '11шт',
        image: 'cardImage3.jpg',
        path: 'blisternaya-upakovka',
    },
    {
        name: 'Упаковка для фруктов',
        quantity: '1шт',
        image: 'cardImage4.jpg',
        path: 'upakovka-dlya-fruktov-i-yagod',
    },
]);

print('Инициализация завершена.');
