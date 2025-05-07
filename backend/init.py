from pymongo import MongoClient

client = MongoClient("db", 27017)

dbProduct = client.product
postProduct = dbProduct.posts

dbFullProducts = client.allProduct
postFullProducts = dbFullProducts.posts

if(postProduct.count_documents({}) == 0):
    dataProduct = [{
        'id': '1',
        'name': 'Типовая упаковка',
        'quantity': '8шт',
        'image': 'cardImage1.jpg',
        'path': 'tipovaya-upakovka',
    },
    {
        'id': '2',
        'name': 'Пищевая упаковка',
        'quantity': '7шт',
        'image': 'cardImage2.jpg',
        'path': 'pishhevaya-upakovka',
    },
    {
        'id': '3',
        'name': 'Блистерная упаковка',
        'quantity': '',
        'image': 'cardImage3.jpg',
        'path': 'blisternaya-upakovka',
    },
    {
        'id': '4',
        'name': 'Упаковка для фруктов',
        'quantity': '1шт',
        'image': 'cardImage4.jpg',
        'path': 'upakovka-dlya-fruktov-i-yagod',
    },
    {
        'id': '5',
        'name': 'Промоупаковка',
        'quantity': '4шт',
        'image': 'promoupakovka_270x270_d7b.jpg',
        'path': 'upakovka-dlya-fruktov-i-yagod',
    },
    {
        'id': '6',
        'name': 'Упаковка разного назначения',
        'quantity': '4шт',
        'image': 'upakovka-raznogo-naznacheniya_270x270_d7b.jpg',
        'path': 'upakovka-dlya-fruktov-i-yagod',
    }
]
postProduct.insert_many(dataProduct)

if(postFullProducts.count_documents({}) == 0):
    dataAllProduct = [{
        'id':'1',
        'idProduct' : '1',
        'name': 'Типовая упаковка 1',
        'image': '17_633x360_1be.jpg',
    },
    {
        'id':'2',
        'idProduct' : '1',
        'name': 'Типовая упаковка 2',
        'image': '19_633x360_1be.jpg',
    },
    {
        'id':'3',
        'idProduct' : '1',
        'name': 'Типовая упаковка 3',
        'image': '21_633x360_1be.jpg',
    },
    {
        'id':'4',
        'idProduct' : '1',
        'name': 'Типовая упаковка 4',
        'image': '56_633x360_1be.jpg',
    },
    {
        'id':'5',
        'idProduct' : '1',
        'name': 'Типовая упаковка 5',
        'image': '59-(1)_633x360_1be.jpg',
    },
    {
        'id':'6',
        'idProduct' : '1',
        'name': 'Типовая упаковка 6',
        'image': '67_633x360_1be.jpg',
    },
    {
        'id':'7',
        'idProduct' : '1',
        'name': 'Типовая упаковка 7',
        'image': '74_633x360_1be.jpg',
    },
    {
        'id':'8',
        'idProduct' : '1',
        'name': 'Типовая упаковка 8',
        'image': '75_633x360_1be.jpg',
    },
    {
        'id':'9',
        'idProduct' : '2',
        'name': 'Упаковка 1',
        'image': '02_633x360_1be.jpg',
    },
    {
        'id':'10',
        'idProduct' : '2',
        'name': 'Упаковка 2',
        'image': '03_633x360_1be.jpg',
    },
    {
        'id':'11',
        'idProduct' : '2',
        'name': 'Упаковка 3',
        'image': '05_633x360_1be.jpg',
    },
    {
        'id':'12',
        'idProduct' : '2',
        'name': 'Упаковка 4',
        'image': '16_633x360_1be.jpg',
    },
    {
        'id':'13',
        'idProduct' : '2',
        'name': 'Упаковка 5',
        'image': '27_633x360_1be.jpg',
    },
    {
        'id':'14',
        'idProduct' : '2',
        'name': 'Упаковка 6',
        'image': '30_633x360_1be.jpg',
    },
    {
        'id':'15',
        'idProduct' : '2',
        'name': 'Упаковка 7',
        'image': '37_633x360_1be.jpg',
    },
    {
        'id':'16',
        'idProduct' : '4',
        'name': 'Упаковка для ягод и фруктов',
        'image': '23-serdcze-s-yagodami-min_633x360_1be.jpg',
    },
    {
        'id':'7',
        'idProduct' : '5',
        'name': 'Промоупаковка 1',
        'image': '09_633x360_1be.jpg',
    },
    {
        'id':'18',
        'idProduct' : '5',
        'name': 'Промоупаковка 2',
        'image': '04_633x360_1be.jpg',
    },
    {
        'id':'19',
        'idProduct' : '5',
        'name': 'Промоупаковка 3',
        'image': '10_633x360_1be.jpg',
    },
    {
        'id':'20',
        'idProduct' : '5',
        'name': 'Промоупаковка 4',
        'image': '24_633x360_1be.jpg',
    },
    {
        'id':'21',
        'idProduct' : '6',
        'name': 'Упаковка разного назначения 1',
        'image': '11_633x360_1be.jpg',
    },
    {
        'id':'22',
        'idProduct' : '6',
        'name': 'Упаковка разного назначения 2',
        'image': '25_633x360_1be.jpg',
    },
    {
        'id':'23',
        'idProduct' : '6',
        'name': 'Упаковка разного назначения 3',
        'image': '41-(1)_633x360_1be.jpg',
    },
    {
        'id':'24',
        'idProduct' : '6',
        'name': 'Упаковка разного назначения 4',
        'image': '49_633x360_1be.jpg',
    },
]
postFullProducts.insert_many(dataAllProduct)
