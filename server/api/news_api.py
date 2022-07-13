import os
import requests

from dotenv import load_dotenv

load_dotenv()

NEWS_API_ROOT_URL = "https://newsapi.org/v2/everything"

def get_news_api_key():
    return os.environ.get("NEWS_API_KEY")

def get_news_articles(q,from_date,sort_by="popularity"):
    res = requests.get(NEWS_API_ROOT_URL,
                       {
                           "q":q,
                           "from":from_date,
                           "sortBy":sort_by,
                           "apiKey": get_news_api_key()
                       } 
                      )
    return res.json()
