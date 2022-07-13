import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from .api.news_api import get_news_articles


# get the directory of the current file to construct relative paths
DIR = os.path.dirname(__file__)


# create the JSON model for a search request
class SearchRequest(BaseModel):
    q: str
    from_date: str

#initialize the FastAPI application
app = FastAPI()


# mount the static folder
app.mount("/static",StaticFiles(directory=f"{DIR}/../client/build/static"),name="static")

# handle serving index.html at the root of our server
@app.get("/")
async def index():
    """Return application index."""
    return FileResponse(f"{DIR}/../client/build/index.html")


#handle POST requests to the /api/search endpoint
@app.post("/api/search")
async def search(req: SearchRequest):
    """Return news articles for the search query and from_date"""
    return get_news_articles(q=req.q, from_date=req.from_date)

