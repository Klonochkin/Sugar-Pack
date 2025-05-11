from fastapi import FastAPI, Request
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
# client.drop_database('user')
# client.drop_database('session')
# client.drop_database('feedback')
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

dbFeedback = client.feedback
postFeedback = dbFeedback.posts

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

@app.get('/api/get-feature/{id}')
async def getProduct(id: str):
    dataSend = postFeature.find({'idProduct': id})
    posts_list = []
    for post in dataSend:
        post_dict = dict(post)
        del post_dict['_id']
        posts_list.append(post_dict)
    return posts_list

@app.post('/api/send-feedback')
async def sendFeedbacj(request: Request):
    data = await request.json()
    name = data["name"]
    email = data["email"]
    phone = data["phone"]
    message = data["message"]
    n=postFeedback.count_documents({})
    userId = n+1
    if( postUser.count_documents({}) == n):
        post = {
            "id": userId,
            "name": name,
            "email": email,
            "phone":phone,
            "message": message,
        }
        postFeedback.insert_one(post)
    return {"message": "Отзыв отправлен"}
