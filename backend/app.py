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
# client.drop_database('typeProduct')
# client.drop_database('product')
# client.drop_database('feature')
dbTypeProduct = client.typeProduct
postTypeProduct = dbTypeProduct.posts

dbProduct = client.product
postProduct = dbProduct.posts

dbFeature = client.feature
postFeature = dbFeature.posts

dbUser = client.user
postUser = dbUser.posts

dbSession = client.session
postSession = dbSession.posts

@app.get('/')
async def welcome():
    return {"message" : "gb"}

@app.get('/api/get-type-catalog')
async def getCatalog():
    dataSend = postTypeProduct.find({})
    posts_list = []
    for post in dataSend:
        post_dict = dict(post)
        del post_dict['_id']
        posts_list.append(post_dict)
    return posts_list

@app.get('/api/get-product-catalog/{id}')
async def getFullCatalog(id: str):
    dataSend = postProduct.find({'idTypeProduct': id})
    posts_list = []
    for post in dataSend:
        post_dict = dict(post)
        del post_dict['_id']
        posts_list.append(post_dict)
    return posts_list

@app.get('/api/get-product/{id}')
async def getProduct(id: str):
    dataSend = postProduct.find({'id': id})
    posts_list = []
    for post in dataSend:
        post_dict = dict(post)
        del post_dict['_id']
        posts_list.append(post_dict)
    return posts_list
