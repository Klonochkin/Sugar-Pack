from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("db", 27017)
# client.drop_database('product')
# client.drop_database('allProduct')
dbProduct = client.product
postProduct = dbProduct.posts

dbFullProducts = client.allProduct
postFullProducts = dbFullProducts.posts


@app.get('/')
async def welcome():
    return {"message" : "gb"}

@app.get('/api/get-catalog')
async def getCatalog():
    dataSend = postProduct.find({})
    posts_list = []
    for post in dataSend:
        post_dict = dict(post)
        del post_dict['_id']
        posts_list.append(post_dict)
    return posts_list

@app.get('/api/get-fullcatalog/{id}')
async def getFullCatalog(id: str):
    dataSend = postFullProducts.find({'idProduct': id})
    print(id)
    posts_list = []
    for post in dataSend:
        post_dict = dict(post)
        del post_dict['_id']
        posts_list.append(post_dict)
    return posts_list


@app.get('/api/init')
async def init():
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
            'quantity': '11шт',
            'image': 'cardImage3.jpg',
            'path': 'blisternaya-upakovka',
        },
        {
            'id': '4',
            'name': 'Упаковка для фруктов',
            'quantity': '1шт',
            'image': 'cardImage4.jpg',
            'path': 'upakovka-dlya-fruktov-i-yagod',
        }]
        postProduct.insert_many(dataProduct)

    if(postFullProducts.count_documents({}) == 0):
        dataAllProduct = [{
            'idProduct' : '1',
            'name': 'Типовая упаковка 1',
            'image': '17_633x360_1be.jpg',
        },
        {
            'idProduct' : '1',
            'name': 'Типовая упаковка 2',
            'image': '19_633x360_1be.jpg',
        },
        {
            'idProduct' : '1',
            'name': 'Типовая упаковка 3',
            'image': '21_633x360_1be.jpg',
        },
        {
            'idProduct' : '1',
            'name': 'Типовая упаковка 4',
            'image': '56_633x360_1be.jpg',
        },
        {
            'idProduct' : '1',
            'name': 'Типовая упаковка 5',
            'image': '59-(1)_633x360_1be.jpg',
        },
        {
            'idProduct' : '1',
            'name': 'Типовая упаковка 6',
            'image': '67_633x360_1be.jpg',
        },
        {
            'idProduct' : '1',
            'name': 'Типовая упаковка 7',
            'image': '74_633x360_1be.jpg',
        },
        {
            'idProduct' : '1',
            'name': 'Типовая упаковка 8',
            'image': '75_633x360_1be.jpg',
        },
        {
            'idProduct' : '2',
            'name': 'Упаковка 1',
            'image': '02_633x360_1be.jpg',
        },
        {
            'idProduct' : '2',
            'name': 'Упаковка 2',
            'image': '03_633x360_1be.jpg',
        },
        {
            'idProduct' : '2',
            'name': 'Упаковка 3',
            'image': '05_633x360_1be.jpg',
        },
        {
            'idProduct' : '2',
            'name': 'Упаковка 4',
            'image': '16_633x360_1be.jpg',
        },
        {
            'idProduct' : '2',
            'name': 'Упаковка 5',
            'image': '27_633x360_1be.jpg',
        },
        {
            'idProduct' : '2',
            'name': 'Упаковка 6',
            'image': '30_633x360_1be.jpg',
        },
        {
            'idProduct' : '2',
            'name': 'Упаковка 7',
            'image': '37_633x360_1be.jpg',
        },
        ]
        postFullProducts.insert_many(dataAllProduct)

    return {"message": "Запись успешно добавлена"}
