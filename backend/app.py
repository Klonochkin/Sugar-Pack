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
dbProduct = client.product
postProduct = dbProduct.posts


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

@app.get('/api/init')
async def init():
    if(postProduct.count_documents({}) == 0):
        post = [{
            'name': 'Типовая упаковка',
            'quantity': '8шт',
            'image': 'cardImage1.jpg',
            'path': 'tipovaya-upakovka',
        },
        {
            'name': 'Пищевая упаковка',
            'quantity': '7шт',
            'image': 'cardImage2.jpg',
            'path': 'pishhevaya-upakovka',
        },
        {
            'name': 'Блистерная упаковка',
            'quantity': '11шт',
            'image': 'cardImage3.jpg',
            'path': 'blisternaya-upakovka',
        },
        {
            'name': 'Упаковка для фруктов',
            'quantity': '1шт',
            'image': 'cardImage4.jpg',
            'path': 'upakovka-dlya-fruktov-i-yagod',
        }]
        postProduct.insert_many(post)
    return {"message": "Запись успешно добавлена"}
