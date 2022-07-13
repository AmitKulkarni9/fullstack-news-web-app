import { useEffect, useState } from "react";
import { fetchMonthlyNews } from "./api/newsApi";
import "./App.css";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [q, setQ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!q) return;

    const searchResults = await fetchMonthlyNews(q);
    setArticles(searchResults);
  };

  useEffect(() => {
    const fetchWorldNews = async () => {
      const searchResults = await fetchMonthlyNews("world news");
      setArticles(searchResults);
    };
    fetchWorldNews();
  }, []);

  return (
    <div className="App">
      <section>
        Enter a search query to find the most popular news articles this month
        🔎
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="q"
            name="q"
            placeholder="world news"
            onChange={(e) => setQ(e.target.value)}
          />
          <br />
          <br />
          <input type="submit" value="Search for articles" />
        </form>
      </section>
      <section>
        {articles && articles.length > 0 && (
          <ol>
            {articles.map((article, index) => {
              const { author, title, url, urlToImage, description } = article;
              return (
                <li key={index}>
                  <a href={url} target="__other">
                    {title}
                  </a>
                  <h5>{author}</h5>
                  <img src={urlToImage} alt={title} />
                  <p>{description}</p>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
};

export default App;