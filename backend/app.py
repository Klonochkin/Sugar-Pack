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
