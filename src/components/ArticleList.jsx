import { useEffect, useState } from "react";
import { getArticles } from "../api/api";
import ArticlePreview from "./ArticlePreview";
import { useNavigate, useParams } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const { topic_slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState();
  const [ascOrDesc, setascOrDesc] = useState("desc");

  function handleSort(e) {
    console.log(e.target.innerText);
    switch (e.target.innerText) {
      case "Date":
        setSort("created_at");
        return;
      case "Comment count":
        setSort("comment_count");
        return;
      case "Upvotes":
        setSort("votes");
        return;
      case "Newest or Oldest":
        ascOrDesc === "desc" ? setascOrDesc("asc") : setascOrDesc("desc");
        return;
      default:
        break;
    }
  }

  useEffect(() => {
    getArticles(topic_slug, sort, ascOrDesc).then((articlesRes) => {
      setArticles(articlesRes);
      setLoading(false);
    });
  }, [topic_slug, sort, ascOrDesc]);

  function handleArticleClick(id) {
    navigate(`/article/${id}`);
  }
  if (!loading) {
    return (
      <div className="article--list-box">
        <section className="sort-by">
          <h3 className="sort-by-text">Sort by:</h3>
          <button
            className="sorting-buttons"
            onClick={handleSort}
            disabled={sort === "created_at"}
          >
            Date
          </button>
          <button
            className="sorting-buttons"
            onClick={handleSort}
            disabled={sort === "comment_count"}
          >
            Comment count
          </button>
          <button
            className="sorting-buttons"
            onClick={handleSort}
            disabled={sort === "votes"}
          >
            Upvotes
          </button>
          <button
            className="sorting-buttons"
            id="asc-desc"
            onClick={handleSort}
          >
            Newest or Oldest
          </button>
        </section>
        <ul className="article--list">
          {articles.map((article) => {
            return (
              <li
                onClick={() => {
                  handleArticleClick(article.article_id);
                }}
                className="article--list-item"
                key={article.article_id}
              >
                <ArticlePreview article={article} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default ArticleList;
